const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const nodemailer = require('nodemailer');
require('dotenv').config();
const uploadFile =require("../middleware/cloudinary.js")
const signup = async (req, res) => {
  console.log("Signup request received:", req.body);

  try {
    const { firstname, lastname, email, password } = req.body;
    let profilephoto;
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Getting profile photo
    const profilePhotoPath = req.file?.path;
    if (profilePhotoPath){
        profilephoto=await uploadFile(profilePhotoPath)
         if(!profilephoto) return res.status(500).json({
                message:"profile photo not uploaded successfully"
            })
    }
   
    // Create new user
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilephoto:profilephoto.secure_url
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
        profilephoto
      },
    });

  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ message: "signup failed", error: e.message });
  }
};

const signin = async (req, res) => {
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


// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '15m' }
    );

    // Reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return res.json({ message: 'Reset link sent successfully', resetLink });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


// Reset Password

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

const userProfile=async (req,res)=>{
   try{
    const token=req.body.token
    if(!token) return res.json({message:'No token found'})
      const decoded=jwt.decode(token,process.env.Jwt_USER_SECRET)
    console.log(decoded)
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    console.log(user)
    const {firstname,lastname,email,profilephoto}=user
    return res.json({firstname,lastname,email,profilephoto})
   }
catch(err)
{
console.error("Reset Password Error:", err);
return res.status(400).json({ message: "Invalid or expired token" });
}
}

const updateUserProfile=async (req,res)=>{
  console.log("reached")
  try {
       const {firstname,lastname,email,token}=req.body
       const profilePhotoPath = req.file?.path;
   if(!token) return res.json({message:'No token found'})
      const decoded=jwt.verify(token,process.env.Jwt_USER_SECRET)
    console.log(decoded)
    const userId=decoded.userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    let profilephoto = user.profilephoto;
    if (profilePhotoPath){
        profilephoto=await uploadFile(profilePhotoPath)
         if(!profilephoto) return res.status(500).json({
                message:"profile photo not uploaded successfully"
            })
    }
    const resp=await userModel.findByIdAndUpdate(
      userId,
      { firstname, lastname, email,profilephoto:profilephoto.secure_url },
      { new: true } 
    );
    if(!resp) return res.json({message:"profile not updated"})
      res.status(200).json({message:'profile updated'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid or expired token" });
  }
 
}

module.exports = { signup, signin, forgotPassword, resetPassword, userProfile,updateUserProfile };
