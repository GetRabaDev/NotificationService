const express = require('express');
const { verifyService } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const {
  notificationSms,
  notificationEmail,
} = require('../controller/user.controller');

const router = express.Router();

router.use(verifyService);

// learning
router.post('/sms', notificationSms);

router.post('/email', notificationEmail);

module.exports = router;
