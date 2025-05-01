import postModel from "../Models/post.model.js";
import userModel from "../Models/user.Model.js";
import { v2 as cloudinary } from "cloudinary";
export const createPost = async (req, res) => {
  const { title, description, images } = req.body;

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
  const postId = req.body.id; // Post ID from the request body
  const authorId = req.authorId; // Author's ID from the middleware

  console.log("Post ID received in deletePost:", postId);
  console.log("Author ID received in deletePost:", authorId);

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
