const { allowedOrigins } = require('../config/allowedOrigins');

const credentials = (request, response, next) => {
  const origin = request.headers.origin;
  if(allowedOrigins.includes(origin)){
    response.header('Access-Control-Allow-Credentials', true)
  };

  next();
}

module.exports = credentials;