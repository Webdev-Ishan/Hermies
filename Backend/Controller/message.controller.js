import Message from "../Models/message.Model.js";

export const getMessages = async (req, res) => {
  const { chatroom } = req.params;
  if (!chatroom) {
    return res.json({
      success: false,
      message: "Every message should have a room.",
    });
  }

  try {
    const messages = await Message.find({ chatId: req.params.chatId });

    if (!messages) {
      return res.json({
        success: false,
        message: "Messages not found for this chatroom",
      });
    }
    return res.json({ success: true, messages });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const createMessage = async (req, res) => {
  const { input, sender } = req.body;

  if (!input || !sender) {
    return res.json({
      success: false,
      message: "chatroom is required for messages",
    });
  }

  try {
    const newMsg = await Message.create({
      chatId: req.params.chatId,
      sender,
      content: input,
    });

    return res.json({ success: true, newMsg });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
