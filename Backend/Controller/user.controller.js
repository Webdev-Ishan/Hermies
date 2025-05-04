import postModel from "../Models/post.model.js";
import userModel from "../Models/user.Model.js";
import { v2 as cloudinary } from "cloudinary";
import Application from "../Models/application.model.js";
import transporter from "../Config/nodemailer.config.js";

export const createPost = async (req, res) => {
  const { title, description, images,type } = req.body;

  if (!title || !description || !images) {
    return res.json({
      success: false,
      message: "Please fill all the requirements.",
    });
  }
  try {
    const imageUpload = await cloudinary.uploader.upload(images, {
      resource_type: "image",
    });

    let post = new postModel({
      title: title,
      description: description,
      images: imageUpload.secure_url,
      author: req.authorId,
      type:type
    });

    await post.save();

    await userModel.findByIdAndUpdate(
      req.authorId, // Author's ID
      { $push: { posts: post._id } }, // Add the post ID to the posts array
      { new: true } // Return the updated document
    );

    return res.json({
      success: true,
      message: "Post created succesfully",
    });
  } catch (error) {
    return res.json({ succes: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const {postId} = req.params
  const authorId = req.authorId; // Author's ID from the middleware

  if (!postId) {
    return res.json({ success: false, message: "Post ID is required." });
  }

  try {
    // Delete the post from the database
    const deletedPost = await postModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.json({
        success: false,
        message: "Post not found or already deleted.",
      });
    }

    // Remove the post ID from the author's `posts` array
    await userModel.findByIdAndUpdate(
      authorId, // Author's ID
      { $pull: { posts: postId } }, // Remove the post ID from the `posts` array
      { new: true } // Return the updated document
    );

    return res.json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const apply = async (req, res) => {
  const { adminRemarks, message } = req.body;
  const {id} = req.params;

  if (!adminRemarks || !message ) {
    return res.json({
      success: false,
      message: "Please apply importent info for applying.",
    });
  }

  try {
    let user = await userModel.findById(req.appliedBy);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let post = await postModel.findById(relatedPost);

    if (!post) {
      return res.json({ success: false, message: "NO apply without post" });
    }

    let application = new Application({
      message: message,
      adminRemarks: adminRemarks,
      appliedBy: req.appliedBy,
      relatedPost: id,
      recieverId: post.author,
    });

    await application.save();

    await userModel.findByIdAndUpdate(
      user._id,
      { $push: { adoptionApplications: application._id } },
      { new: true } // Return the updated document
    );

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Application status",
      text: `Your application is submited`,
    };

    await transporter.sendMail(mailOptions);

    let reciever = await userModel.findById(post.author);
    if (!reciever) {
      return res.json({
        success: false,
        message: "The application has no reciever",
      });
    }

    await userModel.findByIdAndUpdate(
      reciever._id,
      { $push: { recievedApplications: application._id } }, // Add the post ID to the posts array
      { new: true } // Return the updated document
    );

    const mailOptions2 = {
      from: process.env.SENDER_EMAIL,
      to: reciever.email,
      subject: "Application ",
      text: `someone send you application for pet adoption`,
    };

    await transporter.sendMail(mailOptions2);

    return res.json({ success: true, message: "Application is submited" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const cancel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "Application do not exist.." });
  }

  try {
    let user = await userModel.findById(req.appliedBy);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await userModel.findByIdAndUpdate(
      user._id,
      { $pull: { adoptionApplications: id } },
      { new: true } // Return the updated document
    );

    let reciever = await userModel.findById(req.recieverId);

    if (!reciever) {
      return res.json({ success: false, message: "Reciever not found" });
    }

    await userModel.findByIdAndUpdate(
      reciever._id,
      { $pull: { recievedApplications: id } },
      { new: true } // Return the updated document
    );

    await Application.findByIdAndDelete({ _id: id });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Application status",
      text: `Your application is canceled properly.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Application is canceled" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getAll = async(req,res)=>{


try {

  let response = await postModel.find().populate("author", "name email");
  if(!response){
    return res.json({success:false,message:"SOmething went wrong"})
  }

  return res.json({success:true,response})
} catch (error) {
  return res.json({success:false,message:error.message})
}

}

export const petinfo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, message: "Petition ID is required." });
  }

  try {
    const petition = await postModel.findById(id).populate("author","name email");

    if (!petition) {
      return res.json({ success: false, message: "Petition not found." });
    }

    return res.json({ success: true, petition });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
