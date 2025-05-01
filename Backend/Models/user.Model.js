import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  adoptionApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  recievedApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicatio",
    },
  ],
  profilePicture: {
    type: String,
    default: "default-profile.png",
  },
  bio: {
    type: String,
    trim: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
