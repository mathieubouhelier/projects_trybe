const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(process.env.DB_URL || 'mongodb://localhost:27017/webchat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      console.log('connected?');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
module.exports = connection;
