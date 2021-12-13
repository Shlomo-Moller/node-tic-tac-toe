const socket = io('http://localhost:3000')

const connectedUsers = document.getElementById('connected-users')
const game = document.getElementById('game')
const usersList = document.getElementById('users-list')

const goToUsers = () => {
    connectedUsers.classList.remove('no-display')
    game.classList.add('no-display')
}
const goToGame = () => {
    connectedUsers.classList.add('no-display')
    game.classList.remove('no-display')
}

const appendUser = name => {
    const child = document.createElement('div')
    child.id = 'user-' + name
    child.innerText = name
    child.classList.add('user-item')
    child.title = 'Play with ' + name
    child.onclick = () => alert('bla bla')
    usersList.append(child)
}
const removeUser = name => {
    const child = document.getElementById('user-' + name)
    usersList.removeChild(child)
}

// Get user name & map socket.id to it:
const name = prompt("What's your name?")
socket.emit('new-user', name)
socket.on('you-disconnected', () => goToUsers())
socket.on('other-disconnected', name => removeUser(name))
socket.on('you-connected', () => goToGame())
socket.on('other-connected', name => appendUser(name))
