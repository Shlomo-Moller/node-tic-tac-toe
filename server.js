const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.get('/', (req, res) => res.send('Hi'))

const port = process.env.PORT || 3000

server.listen(port, () => console.log('Server started on port', port))
