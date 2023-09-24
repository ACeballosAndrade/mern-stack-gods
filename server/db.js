import mongoose from 'mongoose';
import {MONGODB_URI} from './config.js'


export async function connectDB(){
    try {
        mongoose.set("strictQuery", false);

        const db = await mongoose.connect(MONGODB_URI) 
        console.log("Connectado a ", db.connection.name)
    } catch (error) {
        console.log(error)
    }
}

