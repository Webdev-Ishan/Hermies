import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: 
    {
      type: String, // URLs of images related to the post
    },
  type:{
type:String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  adoptionStatus: {
    type: String,
    enum: ["Available", "Adopted", "Pending"], // Status of the pet adoption
    default: "Available",
  },

});

const postModel = mongoose.model("Post", postSchema);

export default postModel;