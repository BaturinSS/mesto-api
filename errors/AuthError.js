class AuthError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
