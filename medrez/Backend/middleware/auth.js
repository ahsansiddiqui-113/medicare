
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Token is invalid" });
  }
};

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); 
    } else {
      return res.status(403).json({ message: `Access denied for ${role}s` });
    }
  };
};

module.exports = { authMiddleware, roleMiddleware };
