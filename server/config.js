import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://tony10:password01@cluster0.wkyfegu.mongodb.net/MERN_GODS?retryWrites=true&w=majority&appName=Cluster0"
export const PORT = process.env.PORT || 4000

// export const CLOUD_NAME = process.dotenv.CLOUD_NAME
// export const API_KEY = process.dotenv.API_KEY
// export const API_SECRET = process.dotenv.API_SECRET


export const SECRET = 'brontheus'