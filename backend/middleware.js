const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Invalid Token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid user",
    });
  }
};

module.exports = {
  authMiddleware,
};
