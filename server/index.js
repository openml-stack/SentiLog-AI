import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';

import journalRoutes from './routes/journal.js';
import newsRoutes from './routes/news.js';
import authRouter from './routes/authRoute.js';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.get('/',(req, res) => {
  res.send('Server is alive');
});
// API routes
app.use('/api/journal', journalRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/auth', authRouter);

// Error handler
app.use(errorHandler);

// Start server (only once)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
