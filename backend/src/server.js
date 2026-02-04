import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import adminRoutes from "./routes/adminRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();

/* 🔴 THESE TWO LINES ARE CRITICAL 🔴 */
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS not allowed"), false);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC UPLOADS */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (LOCAL)"))
  .catch((err) => console.error("❌ Mongo error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
