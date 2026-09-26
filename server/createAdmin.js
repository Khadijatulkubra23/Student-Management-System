require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@studentmanager.com";
    const password = "Admin@123456";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      existingAdmin.password = await bcrypt.hash(password, 10);

      await existingAdmin.save();

      console.log("Admin account updated successfully.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: "System Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created successfully.");
    }

    console.log("");
    console.log("Admin Login:");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);

    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();