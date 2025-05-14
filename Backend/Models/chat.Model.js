import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Chat = new mongoose.model("Chat", ChatSchema);

export default Chat;
