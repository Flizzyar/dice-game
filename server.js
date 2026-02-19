import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db.js'
connectDB()

const PORT = process.env.PORT || 3000

import DiceRoll from './models/DiceRoll.js'
import Player from './models/Player.js'
import gameRoutes from './routes/gameRoutes.js'

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static('public'))

app.use('/api', gameRoutes)

io.on('connection', (socket) => {
    socket.on('diceRoll', async (data) => {
        try {
            await DiceRoll.create({ name: data.name, dice: data.dice })

            const player = await Player.findOneAndUpdate(
                { name: data.name },
                { $inc: { total: data.dice }, $set: { updatedAt: new Date() } },
                { upsert: true, returnDocument: 'after' }
            )

            io.emit('diceResult', {
                name: data.name,
                dice: data.dice,
                total: player.total
            })
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('newComment', (data) => {
        io.emit('newComment', {
            name: data.name,
            comment: data.comment
        })
    })
})

server.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}/`)
})
