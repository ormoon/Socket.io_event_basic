const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const host = 'localhost'
const path = require('path')
const socketio = require('socket.io')

const server = http.createServer(app);
const io = socketio(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

let count = 0;

io.on('connection', (socket) => {
    console.log("New web socket connection")
    socket.emit('countUpdated', count)
    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count)
        io.emit('countUpdated', count)
    })
});


server.listen(PORT, host, () => {
    console.log(`Server is running at http://${host}:${PORT}`)
})
