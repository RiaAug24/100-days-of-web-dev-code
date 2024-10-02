const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connect = async () => {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("blog");
};

const getDb = () => {
  if (!database) {
    throw { message: "Database connection failed!" };
  }

  return database;
};

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
