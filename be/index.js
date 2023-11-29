import express from 'express';
import mongoose from 'mongoose';
import { connectToMongoDB } from './config/database/database.js';
import cors from 'cors';
import { socketIo } from './config/socket.io/sockets.js';
import userRoute from './route/user.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const app = express();
const httpServer = createServer()

connectToMongoDB();

app.use(express.json());
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://pls-cbxz.vercel.app',
			'wss://pls-phi.vercel.app',
			'https://480a-119-235-25-178.ngrok-free.app',
      'http://172.20.10.3:5173',
      'tcp://0.tcp.ap.ngrok.io:13272'
		],
	})
);
app.use('/api/users', userRoute);

const expressServer = app.listen(3000, () => {
	console.log('connected in port 3000');
});

httpServer.listen(3030)

socketIo(expressServer);

