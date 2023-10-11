 
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
    users = users.filter((user) => user.socketId !== socketId);
    return users
  }

  //get user
  function getUser(userId) {
    return users.find((user) => user.userId === userId);
  } 



  //When user is connected to the server
  io.on("connection", (socket) => {
    console.log('connection'); 

    //Add user to socket
    socket.on("addUser", userId => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    })



    //Send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log('user : ', user);

        console.log("sender: ", senderId);
        console.log("receiver : ", receiverId);
        console.log("message : ", text);

        // Send to one user
        io.to(user?.socket).emit("getMessage", {
          senderId, text, receiverId
        })
    })



    //When user is disconnected from server
    socket.on("disconnect", () => {
      console.log("a user disconnected");

      // remove user disconnected
      removeUser(socket.id);

      //Get user connected without disconnected
      io.emit("getUser", users);
    });
});
