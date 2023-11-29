import { io } from "socket.io-client";

export const socket = io();
// export const socket = io.connect('wss://0.tcp.ap.ngrok.io:12315');
// export const socket = io('http://localhost:3030');