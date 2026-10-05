const express = require('express');
const authController = require('../controllers/authController');
const statsController = require('../controllers/statsController');

const router = express.Router();

router.use(authController.protect);

router.get('/users/total', statsController.getTotalUsers);
router.get('/users/verified', statsController.getVerifiedUsers);
router.get('/users/:userId/plans', statsController.getUserPlansTotal);
router.get('/plans/total', statsController.getTotalPlans);
router.get('/plans/completed', statsController.getCompletedPlans);
router.get('/tasks/overview', statsController.getTasksOverview);

module.exports = router;
