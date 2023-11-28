import { Server, Socket } from 'socket.io'

export const socketIo = (expressServer) =>{
  const io = new Server(expressServer, {
    cors: {
      origin: ['http://localhost:5173', '127.0.0.1:5173', 'http://172.20.10.3:5173']
    }
  })
  
  io.on('connection', socket=>{
    console.log(socket.id)
    socket.emit('message', 'halo')

    socket.on('join-room', (clientId, message)=>{
      console.log(message + clientId)
      socket.join(clientId)
    })

    socket.on('client-coordinate',(data, clientId)=>{
      socket.to(clientId).emit('watcher-coordinate', data)
      console.log(data)
      console.log('client: '+clientId)
    })
  
    socket.on('position',(data)=>{
      console.log(data)
    })
  
    socket.on('disconnect',()=>{
      console.log('disconnected')
    })
  })
}