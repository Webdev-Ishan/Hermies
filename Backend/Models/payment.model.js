import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true, // Razorpay order ID
    },
    paymentId: {
      type: String, // Razorpay payment ID
    },
    signature: {
      type: String, // Razorpay signature for verification
    },
    amount: {
      type: Number,
      required: true, // Payment amount
    },
    currency: {
      type: String,
      default: "INR", // Default currency is INR
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created", // Initial status is "created"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;