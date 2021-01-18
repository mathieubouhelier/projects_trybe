const jwt = require('jsonwebtoken');

const secret = 'projectcookmasterv2';
function createToken(payload) {
  // console.log('inside createJWT', payload);
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  // console.log(token);

  return token;
}

module.exports = createToken;
