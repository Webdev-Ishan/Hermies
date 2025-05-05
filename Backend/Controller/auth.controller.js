import userModel from "../Models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.config.js";
import { v2 as cloudinary } from "cloudinary";

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

    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    let user = new userModel({
      name: name,
      email: email,
      password: hashpassword,
      profilePicture: imageUpload.secure_url,
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Fill all the credentials please!",
    });
  }

  try {
    let existuser = await userModel.findOne({ email });
    if (!existuser) {
      return res.json({
        success: false,
        message: "user do not exists,Please login first.",
      });
    }

    const token = jwt.sign({ id: existuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "lax", // Required for cross-origin cookies
    });

    return res.json({ success: true, message: "User logged insuccessfully." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const profile = async (req, res) => {
  const { id } = req.body;

  try {
    let userProfile = await userModel.findById(id).populate("posts","title description adoptionStatus").populate("adoptionApplications","status");

    if (!userProfile) {
      return res.json({ success: false, message: "something went wrong" });
    }



    
    return res.json({ success: true, userProfile });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });
    return res.json({ success: true, message: "Logout" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
