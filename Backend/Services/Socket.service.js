export const setupSocket = async (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send-message", ({ roomId, message, sender }) => {
      io.to(roomId).emit("receive-message", {
        content: message,
        sender,
        timestamp: new Date(),
      });
    });
  });
};
