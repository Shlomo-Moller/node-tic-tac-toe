const db = require('./db')
const socket = io('http://localhost:3000')

const connectedUsers = document.getElementById('connected-users')
const game = document.getElementById('game')
const usersList = document.getElementById('users-list')
const turn = document.getElementById('turn')

let other = ''

const goToUsers = () => {
    connectedUsers.classList.remove('no-display')
    game.classList.add('no-display')
}
const goToGame = (name, inviter) => {
    other = name
    connectedUsers.classList.add('no-display')
    game.classList.remove('no-display')
    if (inviter)
        socket.to(id).emit('invited', socket.id)
}

const appendUser = ({ id, name }) => {
    const child = document.createElement('div')
    child.id = 'user-' + name
    child.innerText = name
    child.classList.add('user-item')
    child.title = 'Play with ' + name
    child.onclick = () => goToGame({ id, name }, true)
    usersList.append(child)
}
const removeUser = name => document.getElementById('user-' + name).remove()

// Get user name & map socket.id to it:
const name = prompt("What's your name?")
socket.emit('new-user', name)
socket.on('you-disconnected', () => {})
socket.on('other-disconnected', ({ id, name }) => removeUser(name))
socket.on('you-connected', () => goToUsers())
socket.on('other-connected', ({ id, name }) => appendUser({ id, name }))
socket.on('invited', id => {
    const otherName = db.users[id]
    if (prompt('Want to play with ' + otherName + '?'))
        goToGame(otherName, false)
})
