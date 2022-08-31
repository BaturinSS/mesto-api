require('dotenv').config();

//* Подключаем фреймворк express для сервера на ноде
const express = require('express');

//* Подключаем модуль для повышения безопасности сервера
const helmet = require('helmet');

//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Подключаем модуль обработки запроса body
const bodyParser = require('body-parser');

//* Подключаем модуль обработки запроса cookie
const cookieParser = require('cookie-parser');

//* Подключаем обработчик ошибок валидации celebrate
const { errors } = require('celebrate');

//* Подключаем конфигурационный файл 'express-rate-limit'
const { limiter } = require('./utils/limiterConfig');

//* Подключаем обработку запроса CORS
const cors = require('./middlewares/cors');

//* Подключаем обработчик router
const routes = require('./routes/index');

//* Импорт констант
const { PORT, DATA_BASE } = require('./utils/constants');

//* Создаем приложение методом express
const app = express();

//* Подключаем модуль для логирования
const { requestLogger, errorLogger } = require('./middlewares/logger');

//* Подключаемся к серверу mongo
mongoose.connect(DATA_BASE);

//* Импорт мидлвэр централизованной обработки ошибок
const handlingErrors = require('./middlewares/handlingErrors');

//* Обрабатывает CORS запрос OPTIONS
app.options('*', cors);

//* Обрабатывает CORS запроса
app.use(cors);

//* Подключаем логгер запросов
app.use(requestLogger);

//* Обрабатываем количество запросов к серверу
app.use(limiter);

//* Повышаем безопасность запроса через модуль helmet
app.use(helmet());

//* Обрабатываем тело запроса через модуль body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* Обрабатываем куки через модуль cookie-parser
app.use(cookieParser());

//* Обрабатываем все routes
app.use(routes);

//* Подключаем логгер ошибок
app.use(errorLogger);

//* Обрабатываем ошибки с celebrate
app.use(errors());

//* Централизованная обработка ошибок
app.use(handlingErrors);

//* Установим слушателя на порт
app.listen(PORT);
