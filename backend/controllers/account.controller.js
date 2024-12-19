import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { JWT_SECRET, EMAIL_USER, EMAIL_PASS } from "../config.js";

export const postCreateAccount = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Input all required fields.",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // const userRole = role || 'user';

    const newAccount = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const accountRegister = await Account.create(newAccount);
    return res.status(200).send({
      message: "Account Registered",
      accountRegister: accountRegister,
    });
  } catch (err) {
    console.error("Error in postCreateEmployee:", err); // Log detailed error
    res.status(500).json({ message: err.message });
  }
};

/* 
  LOGIN ACCOUNT
  */
export const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }

  try {
    const user = await Account.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Create JWT token with user info (including role)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload to be included in the token
      JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    res
      .status(200)
      .json({ token, role: user.role, message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.error("Forgot Password Error: Email is missing.");
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await Account.findOne({ email });

    if (!user) {
      console.error(`Forgot Password Error: No user found with email ${email}`);
      return res.status(404).json({ message: "User does not exist" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      text: `You requested a password reset. Please click the link to reset your password: http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Email sent successfully",
      info,
    });
  } catch (error) {
    console.error("Forgot Password Error Details:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    return res.status(500).json({
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await Account.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "Password successfully updated!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  });
};
