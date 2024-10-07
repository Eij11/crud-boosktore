import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "../config.js";

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
