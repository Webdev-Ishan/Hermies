import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Chat = new mongoose.model("Chat", ChatSchema);

export default Chat;
