const connection = require('./connection');

const getAllRecipes = async () => {
  const allRecipes = connection
    .connection()
    .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));
  return allRecipes;
};
const getSearchedRecipes = async (query) =>
  connection
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'name', 'user'])
        .where('name like :query')
        .bind('query', `%${query}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));

const getOneRecipe = async (idUser) =>
  connection
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idUser')
        .bind('idUser', idUser)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const insertRecipe = async (userId, user, name, allIngredients, instructions) =>
  connection
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(userId, user, name, allIngredients, instructions)
        .execute(),
    );

const deleteFromDB = (recipeID) =>
  connection
    .connection()
    .then((data) =>
      data.getTable('recipes').delete().where('id = :id').bind('id', recipeID)
      .execute(),
    );

const getAllRecipesByUserID = async (idUser) =>
  connection
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('user_id = :idUser')
        .bind('idUser', idUser)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const updateRecipe = async (recipeID, user, name, allIngredients, instructions) => {
  // console.log('test', recipeID, name);
  connection
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', allIngredients)
        .set('instructions', instructions)
        .where('id = :id')
        .bind('id', recipeID)
        .execute(),
    );
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  getSearchedRecipes,
  insertRecipe,
  deleteFromDB,
  getAllRecipesByUserID,
  updateRecipe,
};
