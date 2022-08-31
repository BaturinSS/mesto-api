//* Импорт констант
const {
  codInternalServerError, textErrorInternalServer,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = codInternalServerError, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === codInternalServerError
        ? textErrorInternalServer
        : message,
    });
  next();
});
