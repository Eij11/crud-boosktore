import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

import {
  postCreateAccount,
  loginAccount,
} from "../controllers/account.controller.js";

router.post("/register", postCreateAccount);
router.post("/login", loginAccount);

// Protected route that requires authentication
router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to the Admin Dashboard!"); // This message can be customized as needed
});

export default router;
