const catchAsync = require("../utils/catchAsync");
const Notification = require('../models/notificationModel');
const AppError = require("../utils/appError");

exports.getUserNotif = catchAsync(async (req, res, next) => {
    console.log(req.user._id);

    // if (req.user._id) req.userId = req.user._id;
    if (!req.user._id) {
        next(new AppError(400, 'User with this id does not exist.'));
    }

    const userNotifs = await Notification.find({ userId: req.user._id });
    console.log(userNotifs);
    res.status(200).json({
        status: 'success',
        data: userNotifs
    });
});