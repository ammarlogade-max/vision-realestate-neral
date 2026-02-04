import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import prisma from "./db/prisma.js";

dotenv.config();

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      email: "admin@visionrealestate.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created");
  process.exit();
};

createAdmin();
