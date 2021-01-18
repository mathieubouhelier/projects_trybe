const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
// };

// const getByName = async (name) => {
//   return await connection().then((db) => db.collection('products').findOne(name(name)));
// };

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  // console.log('result.ops[0]', result.ops[0]);
  const { _id } = result.ops[0];
  const product = {
    id: _id,
    name,
    quantity,
  };
  return product;
};

// const remove = async (id) => {
//   if (!(await getById(id))) return false;

//   await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

//   return true;
// };

const update = async (id, name, quantity) => {
  // console.log('inside update', id, name, quantity, ObjectId(id));
  // if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  // if (!product) return add(name, quantity);
  return result;
};

module.exports = {
  // getById,
  // getByName,
  add,
  // remove,
  update,
};
