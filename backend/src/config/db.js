import mongoose from 'mongoose';
import { ENV } from './env';

const MONGODB_URI = ENV.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export const db = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};