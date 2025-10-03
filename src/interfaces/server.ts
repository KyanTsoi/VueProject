import express from 'express';
import cors from 'cors';
import { connectDB } from '../infrastructure/database';
import authRoutes from './routes/auth.routes';
import moduleRoutes from './routes/module.routes';

const app = express();

// Database connectie
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server draait op http://localhost:${PORT}`);
});