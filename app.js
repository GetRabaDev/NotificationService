const serverless = require('serverless-http');
require('dotenv').config();
const express = require('express');
const app = express();

const ApiError = require('./src/utils/ApiError');
const httpStatus = require('http-status');
const fileUpload = require('express-fileupload');

const cors = require('cors');

const db = require('./src/config/db');

const { notificationRoute } = require('./src/routes');

db;

const { errorConverter, errorHandler } = require('./src/middleware/error');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/notification', notificationRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

// module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

const handler = serverless(app);

module.exports = {
  handler,
  app,
};
