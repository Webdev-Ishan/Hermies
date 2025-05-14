import Message from "../Models/message.Model";

export const getMessages = async (req, res) => {
  const { chatroom } = req.params;
  if (!chatroom) {
    return res.json({
      success: false,
      message: "Every message should have a room.",
    });
  }

  try {
    let response = await Message.find({ chatroom });
    if (!response) {
      return res.json({
        success: false,
        message: "Messages not found for this chatroom",
      });
    }
    return res.json({ success: true, response });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
