import mongoose from 'mongoose'

const diceSchema = new mongoose.Schema({
    name: String,
    dice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('DiceRoll', diceSchema)
