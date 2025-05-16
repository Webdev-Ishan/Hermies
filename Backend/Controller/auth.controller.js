import userModel from "../Models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.config.js";
import { v2 as cloudinary } from "cloudinary";
import { client } from "../Config/redis.js";
import { validateUser } from "../Models/user.Model.js";
import { loginUser } from "../Models/user.Model.js";

export const register = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Good",
    });
  }

  const { name, email, password, bio } = req.body;

  if (!name || !email | !password) {
    return res.json({
      success: false,
      message: "Fill all the credentials please!",
    });
  }
  try {
    let cache = await client.get(`user:${email}`);
    cache = JSON.parse(cache) || null;

    if (cache && cache.email) {
      return res.json({
        success: false,
        message: "user already exists in cache",
      });
    }

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
    await client.set(`user:${email}`, JSON.stringify(user));

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
  const { error } = loginUser(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Good",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Fill all the credentials please!",
    });
  }

  try {
    let cache = await client.get(`user:${email}`);
    cache = JSON.parse(cache) || null;

    if (cache && cache.email) {
      let decode = await bcrypt.compare(password, cache.password);

      if (!decode) {
        return res.json({
          success: false,
          message: "Email or password is wrong.",
        });
      }

      const token = jwt.sign({ id: cache._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        sameSite: "lax", // Required for cross-origin cookies
      });

      return res.json({
        success: true,
        message: "User logged in successfully from cache.",
      });
    }

    let existuser = await userModel.findOne({ email });

    if (!existuser) {
      return res.json({
        success: false,
        message: "user do not exists,Please login first.",
      });
    }

    await client.set(`user:${email}`, JSON.stringify(existuser));
    let decode = await bcrypt.compare(password, existuser.password);

    if (!decode) {
      return res.json({
        success: false,
        message: "Email or password is wrong.",
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
    let userProfile = await userModel
      .findById(id)
      .populate("posts", "title description adoptionStatus")
      .populate("adoptionApplications", "status name ")
      .populate("recievedApplications", "status");

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
    let cache = await client.del(`user:email:${req.body.email}`);

    if (cache) {
      res.cookie("token", "", {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        sameSite: "none", // Required for cross-origin cookies
      });
    }
    return res.json({ success: true, message: "Logout" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const finduser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, message: "User not found without id" });
  }

  try {
    let user = await userModel.findById(id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    let name = user.name;
    return res.json({ success: true, name });
  } catch (error) {
    return res.json({ success: false, message: "User not found without id" });
  }
};
