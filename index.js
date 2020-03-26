import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

// Serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.send('Hello World');
    res.sendFile(`${__dirname}/index.html`);
});

server.listen(8000, () => {
    console.log('Example app listening on port 8000');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);   //send to everyone
        //socket.broadcast.emit('hi');    //send to everyone else
    })
});
