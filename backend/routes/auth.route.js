import express from 'express'
import { checkAuth, forgotPassword, login, logout, resetPassword, signUp, verifyEmail } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.route('/check-auth').get(verifyToken, checkAuth)
router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/verify-email').post(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/logout').get(logout);

export default router;