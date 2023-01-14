const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');
const { verifyToken } = require('../utils/tokenManagement');

const verify = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  abortIf(!token || token == '', httpStatus.FORBIDDEN, 'You shall not pass');
  const data = verifyToken(token);
  abortIf(!data, httpStatus.FORBIDDEN, 'You shall not pass');
  const id = data._id;
  req.user_id = id;
  next();
};

const verifyService = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  abortIf(!token || token == '', httpStatus.FORBIDDEN, 'You shall not pass');
  // const data = verifyToken(token);
  abortIf(
    token !== 'SERVICE_TOKEN',
    httpStatus.FORBIDDEN,
    'You shall not pass'
  );
  next();
};

const verifyAdmin = (req, res, next) => {
  abortIf(
    !req.headers['authorization'],
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const token = req.headers['authorization']?.split(' ')[1];
  abortIf(
    !token || token == '',
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const data = verifyToken(token);
  abortIf(
    !data || data.role !== 'admin',
    httpStatus.FORBIDDEN,
    'you are unauthorized'
  );
  req.admin_id = data.id;
  next();
};

const verifyProvider = (req, res, next) => {
  abortIf(
    !req.headers['authorization'],
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const token = req.headers['authorization']?.split(' ')[1];
  abortIf(
    !token || token == '',
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const data = verifyToken(token);
  abortIf(
    !data || !data['provider_id'],
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  req.provider_id = data.provider_id;
  next();
};

module.exports = {
  verifyService,
};
