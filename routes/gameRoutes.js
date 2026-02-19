import express from 'express'
import Player from '../models/Player.js'
import DiceRoll from '../models/DiceRoll.js'

const router = express.Router()

router.get('/players', async (req, res) => {
    try {
        const players = await Player.find().sort({ updatedAt: -1 })
        res.json(players)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Kunde inte hämta spelare' })
    }
})

router.get('/rolls', async (req, res) => {
    try {
        const rolls = await DiceRoll.find().sort({ createdAt: -1 })
        res.json(rolls)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Kunde inte hämta kast' })
    }
})

export default router
