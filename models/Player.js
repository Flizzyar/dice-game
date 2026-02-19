import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    total: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Player', playerSchema)
