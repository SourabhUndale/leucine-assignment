import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());


app.use('/api', authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
