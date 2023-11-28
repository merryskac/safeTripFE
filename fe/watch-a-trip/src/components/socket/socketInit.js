import { io } from "socket.io-client";

export const socket = io('wss://pls-phi.vercel.app');
// export const socket = io('http://localhost:3000');