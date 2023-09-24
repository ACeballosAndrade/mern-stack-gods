import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/godsdb"
export const PORT = process.env.PORT || 4000

// export const CLOUD_NAME = process.dotenv.CLOUD_NAME
// export const API_KEY = process.dotenv.API_KEY
// export const API_SECRET = process.dotenv.API_SECRET


export const SECRET = 'brontheus'