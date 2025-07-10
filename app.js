const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const reportRoutes = require("./routes/reportRoute");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // for serving images

// Routes
app.use("/api/reports", reportRoutes);
app.use((req, res, next) => {
  console.log("📥 New Request:", req.method, req.url);
  console.log("📦 Headers:", req.headers);
  next();
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  app.listen(5001, '0.0.0.0', () => {
  console.log("Server running on http://0.0.0.0:5001");
});

  })
  .catch(err => console.log(err));
