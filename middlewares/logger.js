const winston = require('winston');
const expressWinston = require('express-winston');

//* Логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ dirname: 'logs', filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

//* Логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ dirname: 'logs', filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
