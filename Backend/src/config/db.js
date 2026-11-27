import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectToDatabase() {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
      // Do not log the connection error: driver messages may contain the URI.
      throw new Error(
          'Could not connect to MongoDB. Check the database configuration and network access.',
          { cause: error }
        );
  }
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
