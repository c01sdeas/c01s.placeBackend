import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoDBConnection = async () => {
    if (process.env.MONGODB_URI) {
        const mongodbconnect = await mongoose.connect(process.env.MONGODB_URI);
        if (mongodbconnect) console.log('db success'); else console.log('db error');
    }
}

export default mongoDBConnection;