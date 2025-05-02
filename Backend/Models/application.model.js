import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default status is "pending"
    },
    message: {
      type: String, // Optional message from the user
      maxlength: 500,
    },
    adminRemarks: {
      type: String, // Optional remarks from the admin
      maxlength: 500,
    },
    relatedPost:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Reference to the User model
        required: true,

    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
