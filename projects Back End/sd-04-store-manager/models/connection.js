const mongoClient = require('mongodb').MongoClient;

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DATABASE_NAME = 'StoreManager';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DATABASE_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
