const DB = require('../models/dbModel');
// const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await DB.getAllRecipes();
  // console.log('recipes dbControler', req.user[0], recipes);
  res.render('home', { user: req.user, recipes });
};

const show = async (req, res) => {
  const { id } = req.params;
  // console.log('id', id);
  const recipeArray = await DB.getOneRecipe(id);
  const recipe = recipeArray[0]; //  To improve!!
  // console.log('one Recipe from controller', recipeArray, req.user, recipe);
  res.render('show', { user: req.user, recipe });
};

const search = async (req, res) => {
  const { q } = req.query;
  // console.log('searchedWord', q);
  const recipes = await DB.getSearchedRecipes(q);
  res.render('search', { user: req.user, recipes });
};

const createRecipe = async (req, res) => {
  const { name, allIngredients, instructions } = req.body;
  const userId = req.user[0].id;
  const user = `${req.user[0].name} ${req.user[0].lastName}`;
  // console.log('from req.body', req.body, user_id, user, req.user);
  await DB.insertRecipe(userId, user, name, allIngredients, instructions);
  res.redirect('/?insertedRecipe=true');
};

const deleteRecipeForm = async (req, res) => {
  const { id } = req.params;
  // console.log('id', id);
  const recipeArray = await DB.getOneRecipe(id);
  const recipe = recipeArray[0]; //  To improve!!
  // console.log('Delete Recipe from controller', recipeArray, req.user, recipe);
  res.render('delete', {
    user: req.user,
    recipeUserID: recipe.userId,
    recipeID: req.params.id,
    message: null,
  });
};

const deleteRecipe = async (req, res) => {
  const { password } = req.body;
  const user = req.user[0];
  const recipeArray = await DB.getOneRecipe(req.params.id);
  const recipe = recipeArray[0]; //  To improve!!
  if (!password) {
    return res.render('delete', {
      message: 'Preencha a senha',
      redirect: null,
      user: req.user,
      recipeUserID: recipe.user_id,
      recipeID: req.params.id,
    });
  }
  if (user.password !== password) {
    return res.render('delete', {
      message: 'Senha Incorreta.',
      redirect: null,
      user: req.user,
      recipeUserID: recipe.user_id,
      recipeID: req.params.id,
    });
  }
  await DB.deleteFromDB(req.params.id);
  res.redirect('/');
  return null;
};

const myRecipes = async (req, res) => {
  const recipes = await DB.getAllRecipesByUserID(req.user[0].id);
  // console.log('myRecipes dbControler', req.user[0], recipes);
  res.render('myrecipes', { user: req.user, recipes });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  // console.log('editRecipe : id_', id);
  const recipeArray = await DB.getOneRecipe(id);
  const recipe = recipeArray[0]; //  To improve!!
  // console.log('one Recipe from controller', recipe);
  res.render('edit', { user: req.user, recipe });
};

const saveEditedRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, allIngredients, instructions } = req.body;
  // const userId = req.user[0].id;
  const user = `${req.user[0].name} ${req.user[0].lastName}`;
  // console.log('from saveEditedRecipe', id, req.params);
  DB.updateRecipe(id, user, name, allIngredients, instructions);
  res.redirect('/');
};

module.exports = {
  listRecipes,
  show,
  search,
  createRecipe,
  deleteRecipe,
  deleteRecipeForm,
  myRecipes,
  editRecipe,
  saveEditedRecipe,
};
