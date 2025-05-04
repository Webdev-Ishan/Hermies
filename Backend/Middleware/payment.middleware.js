import jwt from "jsonwebtoken";

export const payment = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.json({ success: false, message: "User is not logged in." });
  }

  let token = req.cookies.token;
  try {
    let decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodetoken.id) {
      req.user = {}; // Initialize req.user if undefined
      req.user.userId = decodetoken.id;
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
