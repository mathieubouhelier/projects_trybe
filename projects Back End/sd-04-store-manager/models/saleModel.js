// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
// };

// const getByName = async (name) => {
//   return await connection().then((db) => db.collection('products').findOne(name(name)));
// };

const add = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  // console.log('result.ops[0]', result.ops[0]);
  const { _id } = result.ops[0];
  const product = {
    id: _id,
    itensSold,
  };
  return product;
};

// const remove = async (id) => {
//   const saleGetById = await getById(id);
//   // console.log('remove sale', id, saleGetById);
//   if (!saleGetById) return false;

//   await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

//   return saleGetById;
// };

// const update = async (id, name, quantity) => {
//   console.log('inside update', id, name, quantity, ObjectId(id));
//   // if (!ObjectId.isValid(id)) return null;
//   const result = await connection().then((db) =>
//     db.collection('sale').findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, quantity } }),
//   );
//   // if (!product) return add(name, quantity);
//   return result;
// };

module.exports = {
  // getById,
  // getByName,
  add,
  // remove,
  // update,
};
