import Payment from "../Models/payment.model.js";
import Razorpay from "../Config/Razorpay.js";

export const donate = async (req, res) => {
    const { amount, currency } = req.body;
    const userId = req.user.userId;


    if (!amount ) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }


    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }
  try {

       // Create a Razorpay order
       const options = {
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`,
      };
  
      const order = await Razorpay.orders.create(options);
  
      // Save the order details in the database
      const payment = new Payment({
        orderId: order.id,
        amount: amount,
        currency: currency || "INR",
        userId: userId,
        status: "created",
      });
  
      await payment.save();
     return res.json({
      success: true,
      message: "Order created successfully.",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    return res.json({sucess:false,message:error.message})
  }
};
