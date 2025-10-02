import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const moduleRepository = {
  getAll: async () => {
    try {
      await client.connect();
      const db = client.db('Jobbahub');
      const modules = await db.collection('choicemodules').find({}).toArray();
      return modules;
    } finally {
      // Zorg ervoor dat de connectie altijd wordt gesloten.
      await client.close();
    }
  },
};

export default moduleRepository;