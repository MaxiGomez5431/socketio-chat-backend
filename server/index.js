import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

io.on('connection', socket => {
  console.log('Client connected: ', socket.id)

  socket.on('message', (body) => {
    console.log(body)
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(6)
    })
  })
})

app.get('/', (req, res) => {
  res.send('Backend online!!!')
})

server.listen(3000)
console.log('Server running on http://localhost:3000/')
