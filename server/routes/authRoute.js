
const { Router } = require("express");
const passport = require("passport");
const { signup, signin } = require("../controllers/authController");

const authRouter = Router();

// === Email/Password Signup & Signin Routes ===
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

const {  forgotPassword, resetPassword } = require('../controllers/authController'); // your logic here


authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

// === Google OAuth Routes ===
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),
  (req, res) => {
    // Optionally: create or find user in DB and issue token here
    res.redirect(`${process.env.CLIENT_URL}/?token=sample_token`);
  }
);

// === Logout Route ===
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});

// === Get Logged In User ===
authRouter.get("/user", (req, res) => {
  res.send(req.user || null);
});

module.exports = authRouter;