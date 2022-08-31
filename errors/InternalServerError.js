class InternalServerError extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
