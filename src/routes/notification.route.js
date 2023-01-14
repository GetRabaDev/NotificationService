const express = require('express');
const { verifyService } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const { notificationSms } = require('../controller/user.controller');

const router = express.Router();

router.use(verifyService);

// learning
router.post('/sms', notificationSms);

module.exports = router;
