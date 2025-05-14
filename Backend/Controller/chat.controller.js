import Chat from "../Models/chat.Model";

export const getallChats = async (req, res) => {
  try {
    let response = await Chat.find({});
    if (!response) {
      return res.json({
        success: false,
        message: "could not fetch the chat rooms",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const createChat = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({ success: false, message: "Name is required" });
  }

  try {
    let exist = await Chat.find({ name });

    if (exist) {
      return res.json({ success: false, message: "ChatRoom already exist" });
    }

    let Chatroom = new Chat({
      name,
    });

    await Chatroom.save();

    return res.json({ succes: true, message: "ChatRoom Created" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
