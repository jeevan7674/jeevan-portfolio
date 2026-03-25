require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: "r.jeevanreddys680@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      await mongoose.disconnect();
      return;
    }

    const admin = await Admin.create({
      name: "Jeevan Reddy",
      email: "r.jeevanreddys680@gmail.com",
      password: "Jeevan680@",
      role: "admin",
      active: true,
    });

    console.log("Admin created successfully:", admin.toJSON());
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
