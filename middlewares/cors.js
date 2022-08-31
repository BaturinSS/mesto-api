const cors = require('cors');

const { URL_CORS } = require('../utils/constants');

const allowedCors = {
  origin: URL_CORS.split(', '),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
