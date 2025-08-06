const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load .env file early

const setupSwagger = require("./config/swagger");
const errorHandler = require("./middleware/errorHandler");
require("./utils/cronJob"); // Starts the cron job on server start

// Route imports
const journalRoutes = require("./routes/journal");
const newsRoutes = require("./routes/news");
const authRouter = require("./routes/authRoute");
const analyzeRoutes = require("./routes/analyze");
const contactRoutes = require("./routes/Contact");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Base route
app.get("/", (req, res) => {
  res.send("🌐 SentiLog-AI Server is alive");
});

// API Routes
app.use("/api/journal", journalRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRoutes);

// Error Handling
setupSwagger(app); // Swagger setup before error handlers
app.use(errorHandler);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// 500 Internal Server Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
