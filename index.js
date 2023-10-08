 
const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  io.on("connection", (socket) => {
    console.log('connection', socket.id); 

    // let message = "Hello this is socket server!";
    // io.emit("welcome", message);

    socket.on("addUser", userId => {
      console.log('addUser', userId);
      users.push(userId);
    })


    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
    });
});
