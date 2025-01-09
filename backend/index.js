const express = require('express');
const cors=require('cors')
const http = require('http');

const { Server } = require('socket.io');
const connectDB = require('./db');

 
const app = express();
const server = http.createServer(app);
const UserRouter=require('./routes/auth')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());  // Add this line

connectDB()
app.get('/', (req, res) => {
  res.send('Socket.io Server is running!');
});

app.use('/api/auth',UserRouter);

 
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

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
