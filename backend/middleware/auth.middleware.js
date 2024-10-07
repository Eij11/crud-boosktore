import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from headers

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object

    // Check if user has admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
