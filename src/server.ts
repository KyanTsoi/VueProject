import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../infrastructure/database';
// Aangepaste paden om zeker te weten dat ze kloppen
import authRoutes from './routes/auth.routes';
import moduleRoutes from './routes/module.routes';
import studentRoutes from './routes/student.routes';
// Laad environment variabelen
dotenv.config();

const app = express();

// Database connectie
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/students', studentRoutes); // NIEUW

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server draait op http://localhost:${PORT}`);
});