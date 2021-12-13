// Client-side socket.io code !!

const socket_location = 'http://localhost:3000'
// This is where the server hosts the socket.io app,
// which exposes a `/socket.io/socket.io.js` file,
// which defines the `io` function,
// which receives a path and returns the socket variable hosted in that path

// Get the socket variable:
const socket = io(socket_location)
