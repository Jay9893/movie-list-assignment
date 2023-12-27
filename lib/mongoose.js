// lib/mongoose.js

import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://admin:1234@cluster0.n8pvux7.mongodb.net/movies";
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(MONGODB_URI)

  cachedConnection = connection;

  return connection;
}
