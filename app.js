var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// for connection
users = [];
io.on("connection", (socket) => {
  socket.on("sendprivate_msg", function (data) {
    socket.to(data.id).emit("private_msg", data);
  });
  // this will show how many users connected
  console.log(" user connected");
  // this will set username
  socket.on("setUsername", (username, id) => {
    const data = { username, id };
    users.push(data);
    // user = data;
    socket.emit("userSet", {
      username: username,
      id: id,
    });
  });

  socket.on("msg", (data) => {
    //Send message to everyone
    console.log("msg", data);
    io.sockets.emit("newmsg", data);
  });

  socket.on("disconnect", function (data) {
    console.log(" disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on localhost:3000");
});
