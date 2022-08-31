//* Объект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Подключаем валидацию Joi в качестве мидлвэр, будем использовать библиотеку celebrate
const { celebrate, Joi } = require('celebrate');

//* Импорт констант
const { regExURL } = require('../utils/constants');

//* Импорт функций controllers
const {
  getUsers, getUser, getUserInfo,
  updateUser, updateUserAvatar, deleteTokenUser,
} = require('../controllers/users');

//* Принимаем запросы /users
router
  .get('/', getUsers)
  .get('/me', getUserInfo)
  .get('/:id', celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }), getUser)
  .patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }), updateUser)
  .patch('/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(regExURL),
    }),
  }), updateUserAvatar)
  .delete('/me', deleteTokenUser);

//* Экспортировали роутер
module.exports = router;
