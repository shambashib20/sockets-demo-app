import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import path from 'path';

import { Server } from 'socket.io';

dotenv.config();
const app = express();
const http = createServer(app);

const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));


http.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})


const io = new Server(http);

io.on('connection', (socket) => {
    console.log('connected..');
    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message', msg);
    });
});


