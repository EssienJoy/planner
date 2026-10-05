const mongoose = require('mongoose');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Plan = require('../models/planModel');

function sendTotal(res, result) {
    res.status(200).json({
        status: 'success',
        data: { total: result.length > 0 ? result[0].total : 0 },
    });
}

exports.getTotalUsers = catchAsync(async (req, res, next) => {
    const result = await User.aggregate([{ $count: 'total' }]);
    sendTotal(res, result);
});

exports.getTotalPlans = catchAsync(async (req, res, next) => {
    const result = await Plan.aggregate([{ $count: 'total' }]);
    sendTotal(res, result);
});

exports.getVerifiedUsers = catchAsync(async (req, res, next) => {
    const result = await User.aggregate([
        { $match: { emailVerified: true } },
        { $count: 'total' },
    ]);
    sendTotal(res, result);
});

// A plan counts as completed when it has at least one task and every
// task is completed. Plans carry no status flag of their own, so this
// is derived by joining tasks — all counted plans are live records.
exports.getCompletedPlans = catchAsync(async (req, res, next) => {
    const result = await Plan.aggregate([
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'plan',
                as: 'tasks',
            },
        },
        {
            $addFields: {
                taskCount: { $size: '$tasks' },
                completedCount: {
                    $size: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: '$$task.completed',
                        },
                    },
                },
            },
        },
        {
            $match: {
                taskCount: { $gt: 0 },
                $expr: { $eq: ['$completedCount', '$taskCount'] },
            },
        },
        { $count: 'total' },
    ]);
    sendTotal(res, result);
});

exports.getUserPlansTotal = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
        return next(new AppError('Invalid user id', 400));
    }

    const result = await Plan.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $count: 'total' },
    ]);
    sendTotal(res, result);
});

exports.getTasksOverview = catchAsync(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const plansTotal = await Plan.countDocuments({ user: userId });

    const agg = await Plan.aggregate([
        { $match: { user: userId } },
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'plan',
                as: 'tasks',
            },
        },
        { $unwind: '$tasks' },
        {
            $facet: {
                totals: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            completed: {
                                $sum: {
                                    $cond: ['$tasks.completed', 1, 0],
                                },
                            },
                            overdue: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $eq: ['$tasks.completed', false] },
                                                { $lt: ['$tasks.dueDate', now] },
                                            ],
                                        },
                                        1,
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                ],
                byDay: [
                    { $match: { 'tasks.createdAt': { $gte: sevenDaysAgo } } },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: '%Y-%m-%d',
                                    date: '$tasks.createdAt',
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { _id: 1 } },
                ],
                today: [
                    {
                        $match: {
                            'tasks.dueDate': {
                                $gte: startOfToday,
                                $lt: startOfTomorrow,
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            id: '$tasks._id',
                            title: '$tasks.task',
                            completed: '$tasks.completed',
                            dueDate: '$tasks.dueDate',
                            planId: '$_id',
                        },
                    },
                    { $sort: { completed: 1, dueDate: 1 } },
                    { $limit: 20 },
                ],
            },
        },
    ]);

    const facet = agg && agg[0] ? agg[0] : { totals: [], byDay: [], today: [] };
    const counted = facet.totals[0] || { total: 0, completed: 0, overdue: 0 };
    const total = counted.total || 0;
    const completed = counted.completed || 0;
    const pending = total - completed;

    const byDayMap = {};
    (facet.byDay || []).forEach((day) => {
        byDayMap[day._id] = day.count;
    });
    const byDay = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(sevenDaysAgo);
        day.setDate(day.getDate() + i);
        const key = day.toISOString().slice(0, 10);
        byDay.push({
            date: key,
            label: day.toLocaleDateString('en-US', { weekday: 'short' }),
            count: byDayMap[key] || 0,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            plansTotal,
            totals: {
                total,
                completed,
                pending,
                overdue: counted.overdue || 0,
                completionRate:
                    total > 0 ? Math.round((completed / total) * 100) : 0,
            },
            byDay,
            today: facet.today || [],
        },
    });
});
