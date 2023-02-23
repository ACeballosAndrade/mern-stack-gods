import mongoose from 'mongoose'

const diosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    poder: {
        type: String,
        required: true,
        trim: true
    },
    mitologia: {
        type: String,
        required: true,
        trim: true
    },
    afiliacion: {
        type: String,
        required: true,
        trim: true
    },
    hogar: {
        type: String,
        required: true,
        trim: true
    },
    posesiones: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url: String,
        public_id: String
    }
})

export default mongoose.model('Dios', diosSchema)