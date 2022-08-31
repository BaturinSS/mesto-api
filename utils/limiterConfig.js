//* Подключаем модуль ограничения запросов к серверу
const rateLimit = require('express-rate-limit');

//* Ограничение количества запросов к серверу
module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
