const recipeModel = require('../models/recipeModel');

// Check if POST request contain a name,ingredients, preparation
const validatePresenceOfNameIngredientsPreparation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

// Check if on recipe exist by ID
const validateRecipeExistsById = async (req, res, next) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  res.recipe = recipe;
  next();
};

module.exports = {
  validatePresenceOfNameIngredientsPreparation,
  validateRecipeExistsById,
};
