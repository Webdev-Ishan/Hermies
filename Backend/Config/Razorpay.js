import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add this to your .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Add this to your .env file
});

export default razorpayInstance;