
export const setupSocket = async ( io ) => {
  let room;
  io.on("connection", (Socket) => {
    console.log("connected with socket");
  
    Socket.on("join",(data)=>{
      Socket.broadcast.emit("response",data,room)
      
    })
    
    Socket.on("disconnect", () => {
      console.log("You have disconnected");
    });
  });
};
