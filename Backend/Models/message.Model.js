import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = new mongoose.model("Message", messageSchema);

export default Message;
