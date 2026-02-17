const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Must exist
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Must start with Bearer
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "COPPERJEMS_SECRET");
    req.user = decoded;

      req.user._id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

module.exports = protect;
