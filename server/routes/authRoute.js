
const { Router } = require('express');
const { signup, signin, forgotPassword, resetPassword,userProfile,updateUserProfile } = require('../controllers/authController'); // your logic here
const {upload}=require("../middleware/multer")

const authRouter = Router();
authRouter.post('/signup',upload.single("profilePhoto") ,signup);
authRouter.post('/signin', signin);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.post("/user-profile",userProfile)
authRouter.post("/user-profile-update",upload.single("profilePhoto"),updateUserProfile)

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, email, password]
 *             properties:
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *               profilePhoto:{type: string,format: binary}
 *     responses:
 *       201:
 *         description: User created
 */


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Successful login
 */


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Reset link sent
 */


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword]
 *             properties:
 *               token: { type: string }
 *               newPassword: { type: string }
 *     responses:
 *       200:
 *         description: Password reset successful
 */



module.exports = authRouter;
