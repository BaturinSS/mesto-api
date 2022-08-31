class ConflictError extends Error {
  constructor(message = 'Такой пользователь уже существует!') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
