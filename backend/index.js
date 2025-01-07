const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Socket.io Server is running!');
});
 
io.on('connection', (socket) => {
  console.log('A user connected' ,socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected',socket.id);
  });
  socket.on('data', (data) => {
    console.log('Received data:',data.message);
    data.isAdmin=false
    socket.broadcast.emit('data', data);  // Broadcast message to all clients
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
