import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/testdb"
export const PORT = process.env.PORT || 4000