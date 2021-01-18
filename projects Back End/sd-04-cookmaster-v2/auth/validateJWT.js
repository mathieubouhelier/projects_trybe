const jwt = require('jsonwebtoken');

const secret = 'projectcookmasterv2';

const validateJWTBasic = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

const validateJWTToUpdate = (req, res, next) => {
  try {
    // console.log('validateJWTToUpdate');
    const token = req.headers.authorization;
    // console.log('token', token);
    if (!token) {
      // console.log('no token');
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);
    // console.log('validate jwt data', data);
    if (!data) {
      // console.log('no data');
      return res.status(401).json({ message: 'missing auth token' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateJWTBasic, validateJWTToUpdate };
