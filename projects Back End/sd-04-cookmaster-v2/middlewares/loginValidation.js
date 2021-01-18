// Check if POST/login request contain a email, and password
const validatePresenceOfEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

// Check if POST email is correct
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regexEmail.test(email)) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePresenceOfEmailPassword,
};
