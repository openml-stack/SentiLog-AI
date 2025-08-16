const { Router } = require('express');
const { 
  signup, 
  signin, 
  forgotPassword, 
  resetPassword, 
  userProfile, 
  updateUserProfile, 
  deleteAccount, 
  githubCallback, 
  googleCallback 
} = require('../controllers/authController');
const { upload } = require("../middleware/multer");
const jwtmiddleware = require("../middleware/jwt");
const authRouter = Router();

// ======= Google OAuth Routes =======

// // Initiate Google OAuth
// authRouter.get("/google", (req, res) => {
//   console.log("Google OAuth initiation requested");
//   const state = Math.random().toString(36).substring(2, 15);

//   if (req.session) {
//     req.session.oauthState = state;
//   }

//   const googleAuthUrl =
//     `https://accounts.google.com/o/oauth2/auth?` +
//     `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
//     `redirect_uri=${encodeURIComponent(process.env.GOOGLE_CALLBACK_URL)}&` +
//     `scope=openid%20profile%20email&` +
//     `response_type=code&` +
//     `state=${state}`;

//   console.log("Redirecting to Google:", googleAuthUrl);
//   res.redirect(googleAuthUrl);
// });

// In your authRoutes.js
authRouter.get("/google", (req, res) => {
  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_CALLBACK_URL)}&` +
    `scope=openid%20profile%20email&` +
    `response_type=code&` +
    `state=${Math.random().toString(36)}`;
  
  res.redirect(googleAuthUrl);
});

authRouter.get("/google/callback", googleCallback);


// Google OAuth callback
authRouter.get("/google/callback", (req, res) => {
  console.log("Google OAuth callback received");
  googleCallback(req, res);
});

// ======= GitHub OAuth Routes =======

// Initiate GitHub OAuth
authRouter.get("/github", (req, res) => {
  console.log("GitHub OAuth initiation requested");
  const state = Math.random().toString(36).substring(2, 15);

  if (req.session) {
    req.session.oauthState = state;
  }

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GITHUB_CALLBACK_URL)}&` +
    `scope=user:email&` +
    `state=${state}`;

  console.log("Redirecting to GitHub:", githubAuthUrl);
  console.log("Callback URL:", process.env.GITHUB_CALLBACK_URL);
  res.redirect(githubAuthUrl);
});

// GET GitHub callback
authRouter.get("/callback", (req, res) => {
  console.log("GET /callback route hit with query:", req.query);
  githubCallback(req, res);
});

// ======= Unified OAuth Callback Handler =======
authRouter.post("/oauth/callback", async (req, res) => {
  try {
    const { code, state, provider } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: "No authorization code provided" });
    }

    const mockReq = { query: { code, state }, session: req.session };
    let redirectUrl = "";
    const mockRes = {
      redirect: (url) => { redirectUrl = url; },
      status: (code) => ({ json: (data) => res.status(code).json(data) }),
      json: (data) => res.json(data)
    };

    // Call appropriate OAuth handler
    if (provider === 'google') {
      await googleCallback(mockReq, mockRes);
    } else {
      await githubCallback(mockReq, mockRes);
    }

    if (redirectUrl) {
      const url = new URL(redirectUrl);
      const token = url.searchParams.get("token");
      const userB64 = url.searchParams.get("user");
      const error = url.searchParams.get("error");

      if (token) {
        const response = { success: true, token, message: "Authentication successful" };
        if (userB64) {
          try {
            response.user = JSON.parse(Buffer.from(userB64, 'base64').toString('utf8'));
          } catch (e) {
            console.warn("Failed to parse user data:", e);
          }
        }
        return res.json(response);
      } else if (error) {
        return res.status(400).json({ success: false, message: error });
      }
    }

    return res.status(500).json({ success: false, message: "Authentication failed" });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST GitHub callback (for frontend use)
authRouter.post("/callback", (req, res) => {
  console.log("POST /callback route hit with body:", req.body);
  handlePostCallback(req, res);
});

// Handler for POST GitHub callback
const handlePostCallback = async (req, res) => {
  try {
    const { code, state } = req.body;

    if (!code) {
      return res.status(400).json({ message: "No authorization code provided" });
    }

    const mockReq = {
      query: { code, state },
      session: req.session,
    };

    let redirectUrl = "";
    const mockRes = {
      redirect: (url) => {
        redirectUrl = url;
      },
      status: (code) => ({
        json: (data) => res.status(code).json(data),
      }),
      json: (data) => res.json(data),
    };

    await githubCallback(mockReq, mockRes);

    if (redirectUrl) {
      const url = new URL(redirectUrl);
      const token = url.searchParams.get("token");
      const userB64 = url.searchParams.get("user");
      const error = url.searchParams.get("error");

      if (token) {
        const response = { token, message: "Authentication successful" };
        if (userB64) {
          try {
            response.user = JSON.parse(Buffer.from(userB64, 'base64').toString('utf8'));
          } catch (e) {
            console.warn("Failed to parse user data:", e);
          }
        }
        return res.json(response);
      } else if (error) {
        return res.status(400).json({ message: error });
      }
    }

    return res.status(500).json({ message: "Authentication failed" });
  } catch (error) {
    console.error("POST callback error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ======= Swagger Test Route =======
authRouter.get("/test", (req, res) => {
  console.log("Test route hit");
  res.json({
    message: "Auth router is working!",
    env: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? "Set" : "Not set",
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? "Set" : "Not set",
      GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || "Not set",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set",
      GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "Not set",
      CLIENT_URL: process.env.CLIENT_URL || "Not set",
    },
  });
});

// ======= Regular Auth Routes =======
authRouter.post("/signup", upload.single("profilePhoto"), signup);
authRouter.post("/signin", signin);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/user-profile", userProfile);
authRouter.post("/user-profile-update", upload.single("profilePhoto"), updateUserProfile);
authRouter.delete("/delete-account", jwtmiddleware, deleteAccount);

module.exports = authRouter;
