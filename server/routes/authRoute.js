const { Router } = require('express');
const { signup, signin, forgotPassword, resetPassword } = require('../controllers/authController'); // your logic here

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

module.exports = authRouter;
