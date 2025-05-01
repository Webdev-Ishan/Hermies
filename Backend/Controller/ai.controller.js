import ai from '../Services/ai.service.js'

export const result = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.json({
      succes: false,
      message:
        "hello , How can I help you today please provide me with a prompt",
    });
  }

  try {

let response = await ai(prompt)
return res.json({success:true,message:response})

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
