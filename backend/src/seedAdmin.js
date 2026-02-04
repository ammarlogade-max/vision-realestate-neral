import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@visionrealestate.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@visionrealestate.com",
      password: hashedPassword,
    });

    console.log("✅ Admin seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Admin seed failed:", error);
    process.exit(1);
  }
};

seedAdmin();
