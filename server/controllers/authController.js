import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
  console.log("Signup request received:", req.body);

  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.Jwt_USER_SECRET,
      { expiresIn: '1h' }
    );

    console.log("User created successfully:", user.email);

    return res.status(201).json({
      message: "You are signed up",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ message: "signup failed", error: e.message });
  }
};

export const signin = async (req, res) => {
  console.log("Signin request received:", req.body);

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.Jwt_USER_SECRET,
      { expiresIn: '1h' }
    );

    console.log("User authenticated:", user.email);

    return res.json({ token });

  } catch (e) {
    console.error("Signin error:", e);
    return res.status(500).json({ message: "internal error" });
  }
};
