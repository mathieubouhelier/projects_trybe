const express = require('express');
const recipeModel = require('../models/recipeModel');
const recipeValidation = require('../middlewares/recipeValidation');
const validateJWT = require('../auth/validateJWT');
const storeImage = require('../controllers/imageUpload');

const router = express.Router();

// Post/ upload a picture

router.put(
  '/:id/image/',
  recipeValidation.validateRecipeExistsById,
  validateJWT.validateJWTToUpdate,
  storeImage,
  async (req, res) => {
    try {
      const recipe = await recipeModel.findRecipeById(req.params.id);
      const { _id } = recipe;
      await recipeModel.addImage(_id);
      const result = {
        ...recipe,
        image: `localhost:3000/images/${_id}.jpeg`,
      };
      res.status(200).json(result);
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao puxar todas receitas',
        _e,
      });
    }
  },
);

// Post/Create one recipe

router.post(
  '/',
  validateJWT.validateJWTBasic,
  recipeValidation.validatePresenceOfNameIngredientsPreparation,
  async (req, res) => {
    const { _id } = req.data;
    try {
      const { name, ingredients, preparation } = req.body;
      const recipe = await recipeModel.registerRecipe(name, ingredients, preparation, _id);
      // console.log('post create recipe', recipe);
      res.status(201).json({ recipe });
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao salvar a receita no banco',
        _e,
      });
    }
  },
);

// Get all recipes

router.get('/', async (req, res) => {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (_e) {
    res.status(501).json({
      message: 'Erro ao puxar todas receitas',
      _e,
    });
  }
});

// Get one specific recipe by id

router.get('/:id', recipeValidation.validateRecipeExistsById, async (req, res) => {
  try {
    res.status(200).json(res.recipe);
  } catch (_e) {
    res.status(501).json({
      message: 'Erro ao baixar essa receita',
      _e,
    });
  }
});

// Update one specific recipe by id

router.put(
  '/:id',
  recipeValidation.validateRecipeExistsById,
  validateJWT.validateJWTToUpdate,
  async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const recipeUpdated = await recipeModel.updateRecipe(
        req.params.id,
        name,
        ingredients,
        preparation,
      );
      res.status(200).json(recipeUpdated);
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao atualizar essa receita',
        _e,
      });
    }
  },
);

router.delete(
  '/:id',
  recipeValidation.validateRecipeExistsById,
  validateJWT.validateJWTToUpdate,
  async (req, res) => {
    try {
      const recipeDelete = await recipeModel.removeRecipe(req.params.id);
      if (recipeDelete === true) {
        res.status(204).json({
          message: 'Ok',
        });
      }
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao deletar essa receita',
        _e,
      });
    }
  },
);

module.exports = router;
