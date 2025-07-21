const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const journalRoutes = require('./routes/journal');
const newsRoutes = require('./routes/news');
const errorHandler = require('./middleware/errorHandler');
const { authRouter } = require('./routes/authRoute');

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