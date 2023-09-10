const http = require("http");
const app = require("./app");
const { connectMongo } = require("./services/mongo");
const socketIo = require("socket.io");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = socketIo(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: ", room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});

async function startServer() {
  await connectMongo();
  server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}
startServer();
