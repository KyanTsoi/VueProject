import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is niet gedefinieerd in het .env bestand.');
    }
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB verbinding succesvol!');
  } catch (error) {
    console.error('❌ Fout bij het verbinden met MongoDB:', error);
    process.exit(1); // Stop de applicatie als de DB-verbinding mislukt
  }
};