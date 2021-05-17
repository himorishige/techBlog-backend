import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { posts } from './data/post';
import Post from './models/postModel';
import connectDB from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();

    const createPosts = await Post.insertMany(posts);

    console.log(`Data Imported!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();

    console.log(`Data Destroyed!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
