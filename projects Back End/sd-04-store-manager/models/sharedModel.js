const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Using input for db.collection => Thanks for the ideai @Frederico Campello
const getAll = async (collectionName) =>
  connection().then((db) => db.collection(collectionName).find().toArray());

const getById = async (id, collectionName) => {
  // console.log('getbyid', id, collectionName);
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collectionName).findOne(ObjectId(id)));
};

const remove = async (id, collectionName) => {
  // console.log('shared remove ', collectionName);
  if (!(await getById(id, collectionName))) return false;

  await connection().then((db) => db.collection(collectionName).deleteOne({ _id: ObjectId(id) }));

  return true;
};

module.exports = {
  getAll,
  remove,
  getById,
};
