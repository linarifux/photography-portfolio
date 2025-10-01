import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear any existing users to start fresh
    await User.deleteMany();

    // Create a new admin user
    const createdUser = await User.create({
      username: 'admin',
      password: 'password123', // <-- Change this to a strong password
    });

    console.log('Admin user created successfully!');
    console.log(`Username: ${createdUser.username}`);
    console.log('Password: password123 (Your chosen password)');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();