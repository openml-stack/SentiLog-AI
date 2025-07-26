import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import journalRoutes from './routes/journal.js';
import newsRoutes from './routes/news.js';
import errorHandler from './middleware/errorHandler.js';
import authRouter from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/journal', journalRoutes);
app.use('/api/news', newsRoutes);
app.use(errorHandler);

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 