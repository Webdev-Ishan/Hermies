import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  chatname: String, // e.g., user1 + user2
  users: [String],  // Max 2 users
});

const Chat = new mongoose.model("Chat", ChatSchema);

export default Chat;
