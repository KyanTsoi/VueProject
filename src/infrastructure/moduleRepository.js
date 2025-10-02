const { MongoClient } = require('mongodb');

// Connection details (gebruik environment variables in een echt project)
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const moduleRepository = {
  getAll: async () => {
    await client.connect();
    const db = client.db('keuzekompas');
    const modules = await db.collection('choicemodules').find({}).toArray();
    await client.close();
    return modules;
  },
};

module.exports = moduleRepository;