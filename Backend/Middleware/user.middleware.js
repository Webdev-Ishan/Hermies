import jwt from "jsonwebtoken";

export const postUser = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.json({ success: false, message: "User is not logged in." });
  }

  let token = req.cookies.token;
  try {
    let decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodetoken.id) {
      req.authorId = decodetoken.id;
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
