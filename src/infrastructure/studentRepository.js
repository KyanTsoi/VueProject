import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://tktsoi_db_user:H5fd4YNipjf1JjrM@clustertest.clh6fhr.mongodb.net/";
const client = new MongoClient(uri);

const studentRepository = {
  addModuleToShortlist: async (studentId, moduleId) => {
    try {
      await client.connect();
      const db = client.db('Jobbahub');
      const result = await db.collection('students').updateOne(
        { _id: new ObjectId(studentId) },
        // $addToSet zorgt ervoor dat een module niet dubbel wordt toegevoegd.
        { $addToSet: { shortlisted_modules: new ObjectId(moduleId) } }
      );
      return result;
    } finally {
      await client.close();
    }
  },
};

export default studentRepository;