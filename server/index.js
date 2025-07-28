
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

const errorHandler = require('./middleware/errorHandler');
const journalRoutes = require('./routes/journal');
const newsRoutes = require('./routes/news');
const authRouter = require('./routes/authRoute');
const analyzeRoutes = require('./routes/analyze');

require("dotenv").config();

require("./utils/cronJob"); // this starts the cron when the server starts
// const newsFetcher = require("./services/newsFetcher");
// newsFetcher(); // Fetch and post news immediately on server start

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Passport config (make sure this file exists)
require('./config/passport');

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

// Session middleware (required for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get('/', (req, res) => {
  res.send('Server is alive');
});

// Routes
app.use('/api/journal', journalRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/auth', authRouter);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is alive");
});

// API routes
app.use("/api/journal", journalRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRouter);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
