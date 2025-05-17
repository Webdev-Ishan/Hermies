import reviewModel from "../Models/review.model.js";
import User from "../Models/user.Model.js";
export const setreview = async (req, res) => {
  const { title, description } = req.body;
  const id = req.body.id;

  if (!id || !title || !description) {
    return res.json({ success: false, message: "Id is required for review" });
  }

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.json({ success: false, message: "Login or signup first" });
    }

    let review = new reviewModel({
      title: title,
      description: description,
      author: id,
    });

    await review.save();

    return res.json({ success: true, review });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const allreview = async (req, res) => {
  try {
    let allreviews = await reviewModel
      .find()
      .populate("author", " name profilePicture ");

    if (!allreviews) {
      return res.json({ success: false, message: "Something went wrong." });
    }

    return res.json({ success: true, allreviews });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
