import userModel from "../Models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.config.js";

export const register = async (req, res) => {
  const { name, email, password, bio } = req.body;

  if (!name || !email | !password) {
    return res.json({
      success: false,
      message: "Fill all the credentials please!",
    });
  }
  try {
    let existuser = await userModel.findOne({ email });
    if (existuser) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);

    let user = new userModel({
      name: name,
      email: email,
      password: hashpassword,
      bio: bio,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account is registered",
      text: `Welcome to the Hermies platform a dedicated platform for pet lovers and anyone who is seeking a supportive pet.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "User created successfully." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
