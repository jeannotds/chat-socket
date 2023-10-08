 
const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  function addUser(userId, socket) {
    const usersId = !users.some(user => user.userId === userId) && users.push({  userId: userId, socket: socket });
    console.log(usersId);
    return usersId
  }

  io.on("connection", (socket) => {
    console.log('connection'); 


    socket.on("addUser", userId => {
      addUser(userId, socket.id);
      io.emit("getUser", users);
    })


    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
    });
});
