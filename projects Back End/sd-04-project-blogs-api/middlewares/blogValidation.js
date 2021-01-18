// const { Blogs } = require('../models');
const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

// Check if POST create Blog request contain correct data
const blogDataValidation = async (req, res, next) => {
  const { title, content } = req.body;
  const { error } = schema.validate({ title, content });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  blogDataValidation,
};
