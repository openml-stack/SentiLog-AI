const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

const journalRoutes = require('./routes/journal');
const newsRoutes = require('./routes/news');
const { authRouter } = require('./routes/authRoute');
const analyzeRoutes = require('./routes/analyze');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/journal', journalRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/auth', authRouter);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
