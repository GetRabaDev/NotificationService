// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { NotificationService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

// const customerService = new CustomerService();

const notificationSms = catchAsync(async (req, res, next) => {
  const todo = await NotificationService.notificationSms(req.body);
  return successResponse(req, res, todo);
});

const notificationEmail = catchAsync(async (req, res, next) => {
  const todo = await NotificationService.notificationEmail(req.body);
  return successResponse(req, res, todo);
});

module.exports = {
  notificationSms,
  notificationEmail,
};
