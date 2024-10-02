const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let database;

let initDB = async () => {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("quotes");
};

function getDb() {
  if (!database) {
    throw new error("Database connection failed!");
  }
  return database;
}

module.exports = {
  initDB: initDB,
  getDb: getDb,
};
