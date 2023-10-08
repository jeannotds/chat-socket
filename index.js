 
  //Init socket
  const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  //Get users connected to the server
  function addUser(userId, socket) {
    const usersId = !users.some(user => user.userId === userId) && users.push({  userId: userId, socket: socket });
    console.log(usersId);
    return usersId
  }

  //Remove users connected to the server
  function removeUser(socketId) {
    users = users.filter(user => user.userId !== socketId);
  }

  //Connection socket and action
  io.on("connection", (socket) => {
    console.log('connection'); 

    //Add user to socket
    socket.on("addUser", userId => {
      addUser(userId, socket.id);
      io.emit("getUser", users);
    })

    //Disconnect socket and Remove user disconnected
    socket.on("disconnect", (reason) => {
      console.log("a user disconnected", reason);
      removeUser(socket.id);
      //Get user connected without disconnected
      io.emit("getUser", users);
    });
});
