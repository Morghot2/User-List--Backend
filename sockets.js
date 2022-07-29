// let io;
// exports.socketConnection = (server, params) => {
//   io = require("socket.io")(server, params);
//   io.on("connection", (socket) => {
//     // socket.on("Records", (data) => {
//     //   io.sockets.emit("Records", data);
//     // });
//     // console.log(`New client connected ${socket.id}`);
//   });
// };

// exports.sendMessage = (socket) =>
//   socket.on("Records", (data) => {
//     io.sockets.emit("Records", data);
//   });
