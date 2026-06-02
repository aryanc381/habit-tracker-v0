import mongoose from 'mongoose';
import { env } from '../env.js';
export async function connectDb() {
    // readyState values: 1=connected, 2=connecting, 3=disconnecting
    if (mongoose.connection.readyState === 1) {
        console.log('Database is already connected.');
        return;
    }
    await mongoose.connect(env.DB_URI);
    console.log('Database is connected successfully.');
}
//# sourceMappingURL=mongo.js.map