import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const studentRepository = {
  addModuleToShortlist: async (studentId, moduleId) => {
    await client.connect();
    const db = client.db('keuzekompas');
    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: { shortlisted_modules: new ObjectId(moduleId) } }
    );
    await client.close();
    return result;
  },
};

export default studentRepository;