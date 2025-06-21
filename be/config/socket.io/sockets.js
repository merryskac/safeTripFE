import { Server, Socket } from "socket.io";

export const socketIo = (expressServer) => {
  const io = new Server(expressServer, {
    cors: {
      origin: ["http://localhost:5173", "127.0.0.1:5173"],
    },
  });

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(id);

    socket.on("join-room", (clientId, message) => {
      // console.log(message + clientId)
      socket.join(clientId);
    });

    socket.on("watcher-join", (watcherName, roomId) => {
      // console.log(watcherName)
      socket.to(roomId).emit("watcher-joining", socket.id, watcherName);
    });

    socket.on("client-coordinate", (data, clientId) => {
      console.log(data);
      socket.to(clientId).emit("watcher-coordinate", data);
      // console.log(data)
      // console.log('client: '+clientId)
    });

    socket.on("disconnect", (reason) => {
      console.log(socket.id + " disconnect due to " + reason);
      socket.broadcast.emit("watcher-disconnect", socket.id);
      // socket.off()
    });
  });
};
