import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  postCreateAccount,
  loginAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/account.controller.js";

const router = express.Router();

router.post("/register", postCreateAccount);
router.post("/login", loginAccount);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

// Protected route that requires authentication
router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to the Admin Dashboard!"); // This message can be customized as needed
});

export default router;
