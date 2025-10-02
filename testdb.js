import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function runTest() {
  console.log('Verbinding proberen te maken met MongoDB...');
  try {
    await client.connect();
    const db = client.db('Jobbahub');
    const collection = db.collection('choicemodules');
    const modules = await collection.find({}).toArray();

    console.log('✅ Verbinding gelukt!');

    if (modules.length > 0) {
      console.log(`✅ ${modules.length} module(s) gevonden in de database:`);
      console.log(modules);
    } else {
      console.log('⚠️ De collectie is leeg. Heb je de data geïmporteerd?');
    }

  } catch (error) {
    console.error('❌ Fout bij het verbinden met de database:');
    console.error(error.message);
  } finally {
    await client.close();
  }
}

runTest();