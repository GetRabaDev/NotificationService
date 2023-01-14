const { v2 } = require('cloudinary');
const { abortIf } = require('./responder');
const httpStatus = require('http-status');

v2.config({
  cloud_name: 'dsavh0wlc',
  api_key: '565295426515125',
  api_secret: 'U7OS6MyKGVtHnId5qNMsan-hsrE',
});

const cloudinaryUpload = (image) => {
  const upload = v2.uploader
    .upload(image.tempFilePath, {
      resource_type: 'auto',
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      abortIf(error, httpStatus.BAD_REQUEST, 'Failed to upload');
      return { status: false };
    });
  return upload;
};

module.exports = {
  cloudinaryUpload,
};
