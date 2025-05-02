import Payment from "../Models/payment.model.js";
import Razorpay from "../Config/Razorpay.js";

export const donate = async (req, res) => {
    const { amount, currency, userId } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ success: false, message: "Amount and userId are required." });
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
      return res.json({success:true,message:"Payment successfull"});

  } catch (error) {
    return res.json({sucess:false,message:error.message})
  }
};
