document.getElementById('rollBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value
    const randDice = Math.floor(Math.random() * 6 + 1)

    socket.emit('diceRoll', {
        name: name,
        dice: randDice
    })
})

socket.on('diceResult', (data) => {
    const list = document.getElementById('results')

    const li = document.createElement('li')
    li.textContent = `${data.name} kastade ${data.dice}. Total summa: ${data.total}`

    list.appendChild(li)
})

document.getElementById('commentBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value
    const comment = document.getElementById('commentInput').value

    if (!comment) return

    socket.emit('newComment', { name, comment })
    document.getElementById('commentInput').value = ''
})

socket.on('newComment', (data) => {
    const list = document.getElementById('commentsList')
    const li = document.createElement('li')
    li.textContent = `${data.name}: ${data.comment}`
    list.appendChild(li)
})
