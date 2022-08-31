//* Импорт модели данных
const Card = require('../models/card');

//* Импорт констант
const {
  textMessageDeleteCard,
  textErrorNoCard, codCreated,
} = require('../utils/constants');

//* Импорт классового элемента ошибки
const ValidationError = require('../errors/ValidationError');

//* Импорт классового элемента ошибки
const AccessError = require('../errors/AccessError');

//* Импорт классового элемента ошибки
const NotFoundError = require('../errors/NotFoundError');

//* Экспорт функций в routes
module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => {
      res
        .send(cards);
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(codCreated)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};
module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(textErrorNoCard);
      } else if (card.owner.toHexString() !== req.user._id) {
        throw new AccessError();
      }
      card
        .remove()
        .then(() => {
          res
            .send({ message: textMessageDeleteCard, card });
        })
        .catch(next);
    })
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(textErrorNoCard);
      }
      res
        .send(card);
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(textErrorNoCard);
      }
      res
        .send(card);
    })
    .catch(next);
};
