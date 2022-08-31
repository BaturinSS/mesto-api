//* Объект связанный с app, на который мы и повесим обработчики
const router = require('express').Router();

//* Подключаем валидацию Joi в качестве мидлвэр, будем использовать библиотеку celebrate
const { celebrate, Joi } = require('celebrate');

//* Импорт констант
const { regExURL } = require('../utils/constants');

//* Импорт функций controllers
const {
  getCards, createCard,
  deleteCard, likeCard,
  dislikeCard,
} = require('../controllers/cards');

//* Принимаем запросы
router
  .get('/', getCards)
  .post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regExURL),
    }),
  }), createCard)
  .put('/:cardId/likes', celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }), likeCard)
  .delete('/:cardId', celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }), deleteCard)
  .delete('/:cardId/likes', celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }), dislikeCard);

//* Экспортировали роутер
module.exports = router;
