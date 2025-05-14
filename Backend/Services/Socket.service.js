
export const setupSocket = async ( io ) => {
  io.on("connection", (Socket) => {
    console.log("connected with socket");
  
    Socket.on("join",(data)=>{
      Socket.broadcast.emit("response",data)
      
    })
    
    Socket.on("disconnect", () => {
      console.log("You have disconnected");
    });
  });
};
