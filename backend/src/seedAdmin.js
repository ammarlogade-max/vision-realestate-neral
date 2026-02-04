import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import prisma from "./db/prisma.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: "admin@visionrealestate.com" },
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.admin.create({
      data: {
        email: "admin@visionrealestate.com",
        password: hashedPassword,
      },
    });

    console.log("✅ Admin seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Admin seed failed:", error);
    process.exit(1);
  }
};

seedAdmin();
