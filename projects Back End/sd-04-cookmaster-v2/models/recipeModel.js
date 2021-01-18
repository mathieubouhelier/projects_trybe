const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllRecipes = async () => {
  // pode tentar then
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find({}).toArray();
    return allRecipes;
  } catch (err) {
    console.log('Error', err);
  }
};

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );
  return result.ops[0];
};

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  } catch (err) {
    console.log('Error', err);
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    const result = {
      id,
      name,
      ingredients,
      preparation,
    };
    return result;
  } catch (err) {
    console.log('Error', err);
  }
};

const removeRecipe = async (id) => {
  try {
    // console.log('removeRecipe', id);
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return true;
  } catch (e) {
    print(e);
  }
};

const addImage = async (id) => {
  try {
    const db = await connection();
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/images/${id}.jpeg` } });

    return true;
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  removeRecipe,
  addImage,
};
