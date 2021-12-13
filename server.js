const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { cors: { origin: '*' } })

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', socket => {
    console.log('A user connected. Socket:', socket.id)
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log('Server started on port', port))
