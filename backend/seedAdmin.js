const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

// seed script to create initial super admin
const seedAdmin = async () => {
  try {
    // connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // check if super admin already exists
    const existingAdmin = await User.findOne({
      email: "superAdmin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Super Admin already exists");
      process.exit();
    }

    // hash default password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // create super admin user
    await User.create({
      email: "superAdmin@gmail.com",
      password: hashedPassword,
      role: "admin",
      mobile: 7348862962,
      isSuperAdmin: true  
    });

    console.log("Super Admin created successfully");
    process.exit();

  } catch (error) {
    // log error if something fails
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
