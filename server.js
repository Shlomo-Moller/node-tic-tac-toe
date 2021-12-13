const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const db = require('./db')
const io = new Server(server, { cors: { origin: '*' } })

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', socket => {
    socket.on('disconnect', () => {
        socket.to(socket.id).emit('you-disconnected')
        delete db.users[socket.id]
            socket.broadcast.emit('other-disconnected', name)
    })
    socket.on('new-user', name => {
        db.users[socket.id] = name
        socket.to(socket.id).emit('you-connected')
        socket.broadcast.emit('other-connected', name)
    })
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log('Server started on port', port))
