import Chat from "../Models/chat.Model.js";
import User from "../Models/user.Model.js";

export const getallChats = async (req, res) => {
  const  id  = req.body.id;
  try {
    let response = await User.findById(id)
    .populate("chats","name")

    if (!response) {
      return res.json({
        success: false,
        message: "could not fetch the chat rooms",
      });
    }

    return res.json({ success: true, response });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const createChat = async (req, res) => {
  const { name } = req.body;
  
  const id= req.createdby

  if (!name || !id) {
    return res.json({ success: false, message: "Name and id is required",name,id });
  }

  try {
    let exist = await Chat.findOne({name:name });

    if (exist) {
      return res.json({ success: false, message: "ChatRoom already exist" });
    }

    let user = await User.findById(id);

    if (!user) {
      return res.json({ success: false, message: "User is not logged in." });
    }

    let Chatroom = new Chat({
      name: name,
      createdby: id,
    });

    await Chatroom.save();

    await User.findByIdAndUpdate(
      id,
      { $push: { chats: Chatroom._id } },
      { new: true }
    );

    return res.json({ success: true, message: "ChatRoom Created" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
