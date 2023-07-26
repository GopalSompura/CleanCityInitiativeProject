const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5000",
  },
});

let users = [];
const addUser = (userid, socketid) => {
  !users.some((user) => user.userid === userid) &&
    users.push({ userid, socketid });
};

const removeuser = (socketid) => {
  users = users.filter((user) => user.socketid !== socketid);
};

const getuser = (userid) => {
  return users.find((user) => user.userid === userid);
};
//connected
io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("adduser", (userid) => {
    addUser(userid, socket.id);
  });
  io.emit("getusers", users);

  //sending messages and receiving messages
  socket.on("sendmessage", ({ senderid, receiverid, text, title }) => {
    const user = getuser(receiverid);
    io.to(user.socketid).emit("getmessage", {
      senderid,
      text,
      title,
    });
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log("A user is disconnected!");
    removeuser(socket.id);
    io.emit("getusers", users);
  });
});
