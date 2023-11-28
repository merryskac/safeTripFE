import express from 'express'
import mongoose from 'mongoose'
import { connectToMongoDB } from './config/database/database.js'
import cors from 'cors'
import { socketIo } from './config/socket.io/sockets.js'
import userRoute from './route/user.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

connectToMongoDB()

app.use(express.json())
app.use(cors({
  origin: ['http://172.20.10.3:5173', 'https://pls-phi.vercel.app']
}))
app.use('/api/users', userRoute)

const expressServer = app.listen(3000, ()=>{
  console.log('connected in port 3000')
})

socketIo(expressServer)