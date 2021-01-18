const Joi = require('joi');
const { User } = require('../models');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

// Check if POST create User request contain correct data
const userDataValidation = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = schema.validate({ displayName, email, password, image });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

// Check if POST Login request contain correct data
const loginDataValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

// Check if POST request contain an unique email
const emailAlreadyExist = async (req, res, next) => {
  const { email } = req.body;
  const emailFromDB = await User.findOne({ where: { email } });
  if (emailFromDB) {
    return res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = {
  emailAlreadyExist,
  userDataValidation,
  loginDataValidation,
};
