const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

// Conditionally import Cloudinary only if environment variables are set
let uploadFile = null;
try {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    uploadFile = require("../middleware/cloudinary.js");
  }
} catch (error) {
  console.warn("Cloudinary not configured - image uploads will be disabled");
}

// Password validation function
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  let errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (!hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!hasNumbers) {
    errors.push("Password must contain at least one number");
  }

  if (!hasSymbols) {
    errors.push("Password must contain at least one special character");
  }

  return { isValid: errors.length === 0, errors };
};

const signup = async (req, res) => {
  console.log("Signup request received:", req.body);

  try {
    const { firstname, lastname, email, password } = req.body;
    let profilephoto;
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet security requirements", 
        errors: passwordValidation.errors 
      });
    }
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Getting profile photo
    const profilePhotoPath = req.file?.path;
    if (profilePhotoPath && uploadFile){
        profilephoto = await uploadFile(profilePhotoPath)
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
      profilephoto: profilephoto?.secure_url,
      registrationSource: 'local'
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '7d' }
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
        profilephoto: profilephoto?.secure_url
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

    // Check if user can login with password
    if (!user.canLoginWithPassword()) {
      return res.status(400).json({ message: "Please use OAuth login method" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Update last login
    user.lastLoginAt = new Date();
    user.lastLoginMethod = 'local';
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '7d' }
    );

    console.log("User authenticated:", user.email);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilephoto: user.profilephoto
      }
    });

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

    // Check if user can reset password
    if (!user.canLoginWithPassword()) {
      return res.status(400).json({ message: "Password reset not available for OAuth accounts" });
    }

    // Create a reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '15m' }
    );

    // Reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send reset email
    const transporter = nodemailer.createTransporter({
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
    // Validate new password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet security requirements", 
        errors: passwordValidation.errors 
      });
    }

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

// Google OAuth Callback Handler (updated to use new schema methods)
const googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    console.log("Google OAuth callback received:", { code: !!code, state });

    if (!code) {
      console.error("No authorization code received from Google");
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=no_code`);
    }

    // Exchange authorization code for access token
    console.log("Exchanging code for access token...");
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.GOOGLE_CALLBACK_URL
    });

    const { access_token, id_token } = tokenResponse.data;
    console.log("Token exchange successful:", { access_token: !!access_token });

    if (!access_token) {
      console.error("No access token received from Google");
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=no_access_token`);
    }

    // Get user information from Google
    console.log("Fetching user info from Google...");
    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`);
    const userData = userResponse.data;
    
    console.log("User data received:", { id: userData.id, email: userData.email, name: userData.name });

    // Check if user already exists using new schema method
    let user = await userModel.findByEmailOrGoogle(userData.email, userData.id.toString());

    if (user) {
      // User exists, update Google info if needed
      if (!user.googleId) {
        user.googleId = userData.id.toString();
        user.accountType = user.password ? 'hybrid' : 'google';
        user.googleProfile = {
          name: userData.name,
          picture: userData.picture,
          verifiedEmail: userData.verified_email,
          locale: userData.locale
        };
        user.lastLoginAt = new Date();
        user.lastLoginMethod = 'google';
        await user.save();
      }
    } else {
      // Create new user
      const names = userData.name ? userData.name.split(' ') : ['User', ''];
      user = await userModel.create({
        firstname: names[0] || 'User',
        lastname: names.slice(1).join(' ') || '',
        email: userData.email,
        googleId: userData.id.toString(),
        accountType: 'google',
        isEmailVerified: userData.verified_email,
        registrationSource: 'google',
        profilephoto: userData.picture,
        lastLoginMethod: 'google',
        googleProfile: {
          name: userData.name,
          picture: userData.picture,
          verifiedEmail: userData.verified_email,
          locale: userData.locale
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '7d' }
    );

    console.log("Google OAuth successful for user:", user.email);
    
    // Encode user data for URL transmission
    const userB64 = Buffer.from(JSON.stringify({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilephoto: user.profilephoto || userData.picture,
      provider: 'google'
    })).toString('base64');
    
    // Redirect back to frontend with token and user data
    const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${userB64}&provider=google`;
    console.log("Redirecting to frontend with token");
    
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('Google OAuth error:', error.response?.data || error.message);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=google_oauth_failed`);
  }
};

// GitHub OAuth Callback (unchanged - keeping exactly as is)
const githubCallback = async (req, res) => {
  try {
    console.log("GitHub callback received:", req.query);
    
    const { code, state, error } = req.query;
    
    // Handle OAuth errors
    if (error) {
      console.error("GitHub OAuth error:", error);
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=${encodeURIComponent(error)}`);
    }
    
    // Verify state parameter to prevent CSRF attacks (if session is available)
    if (req.session && req.session.oauthState && state !== req.session.oauthState) {
      console.error("Invalid OAuth state");
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=invalid_state`);
    }
    
    if (!code) {
      console.error("No authorization code received");
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=no_code`);
    }

    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { access_token, error: token_error } = tokenResponse.data;
    
    if (token_error || !access_token) {
      console.error("Token exchange error:", token_error);
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=token_exchange_failed`);
    }

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const githubUser = userResponse.data;
    
    // Get user's email (GitHub API might not return email in user object)
    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    const emails = emailResponse.data;
    const primaryEmail = emails.find(email => email.primary)?.email || githubUser.email;
    
    if (!primaryEmail) {
      console.error("No email found for GitHub user");
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=no_email`);
    }

    // Check if user already exists
    let user = await userModel.findOne({
      $or: [
        { email: primaryEmail },
        { githubId: githubUser.id.toString() }
      ]
    });

    if (user) {
      // User exists, update GitHub info if needed
      if (!user.githubId) {
        user.githubId = githubUser.id.toString();
        user.accountType = user.password ? 'hybrid' : 'github';
        user.githubProfile = {
          username: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          name: githubUser.name,
          bio: githubUser.bio,
          location: githubUser.location,
          company: githubUser.company,
          publicRepos: githubUser.public_repos,
          followers: githubUser.followers,
          following: githubUser.following,
          profileUrl: githubUser.html_url
        };
        await user.save();
      }
    } else {
      // Create new user
      const names = githubUser.name ? githubUser.name.split(' ') : [githubUser.login, ''];
      user = await userModel.create({
        firstname: names[0] || githubUser.login,
        lastname: names.slice(1).join(' ') || '',
        email: primaryEmail,
        githubId: githubUser.id.toString(),
        accountType: 'github',
        isEmailVerified: true, // GitHub emails are verified
        registrationSource: 'github',
        profilephoto: githubUser.avatar_url,
        githubProfile: {
          username: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          name: githubUser.name,
          bio: githubUser.bio,
          location: githubUser.location,
          company: githubUser.company,
          publicRepos: githubUser.public_repos,
          followers: githubUser.followers,
          following: githubUser.following,
          profileUrl: githubUser.html_url
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '7d' }
    );

    console.log("GitHub OAuth successful for user:", user.email);
    
    // Clear the OAuth state from session if it exists
    if (req.session && req.session.oauthState) {
      delete req.session.oauthState;
    }
    
    // Encode user data for URL transmission
    const userB64 = Buffer.from(JSON.stringify({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profilephoto: user.profilephoto,
      provider: 'github'
    })).toString('base64');
    
    // Redirect to frontend OAuth callback page with token
    return res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${userB64}&provider=github`);

  } catch (error) {
    console.error("GitHub OAuth callback error:", error);
    return res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=server_error`);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.userid; // set by jwtmiddleware

    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete Account Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const userProfile = async (req, res) => {
   try{
    const token = req.body.token
    if(!token) return res.json({message:'No token found'})
      const decoded = jwt.verify(token, process.env.JWT_USER_SECRET)
    console.log(decoded)
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    console.log(user)
    const {firstname, lastname, email, profilephoto} = user
    return res.json({firstname, lastname, email, profilephoto})
   }
catch(err)
{
console.error("User Profile Error:", err);
return res.status(400).json({ message: "Invalid or expired token" });
}
}

const updateUserProfile = async (req, res) => {
  console.log("reached")
  try {
       const {firstname, lastname, email, token} = req.body
       const profilePhotoPath = req.file?.path;
   if(!token) return res.json({message:'No token found'})
      const decoded = jwt.verify(token, process.env.JWT_USER_SECRET)
    console.log(decoded)
    const userId = decoded.userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    let profilephoto = user.profilephoto;
    if (profilePhotoPath && uploadFile){
        profilephoto = await uploadFile(profilePhotoPath)
         if(!profilephoto) return res.status(500).json({
                message:"profile photo not uploaded successfully"
            })
    }
    const resp = await userModel.findByIdAndUpdate(
      userId,
      { firstname, lastname, email, profilephoto: profilephoto?.secure_url || profilephoto },
      { new: true } 
    );
    if(!resp) return res.json({message:"profile not updated"})
      res.status(200).json({message:'profile updated'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}

module.exports = { 
  signup, 
  signin, 
  forgotPassword, 
  resetPassword, 
  userProfile, 
  updateUserProfile, 
  deleteAccount, 
  githubCallback, 
  googleCallback 
};
