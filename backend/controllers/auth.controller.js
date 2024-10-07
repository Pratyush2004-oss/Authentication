import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookies.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { UserModel } from "../models/user.model.js";

// SignUp Controller
export const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Fill in all the fields",
                success: false
            })
        }
        const userAlreadyExists = await UserModel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                message: "user Already exists",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000        //24 hours
        })

        await user.save();

        // jwt token creation 
        generateTokenandSetCookie(res, user.id);

        // Sending verification mail 
        await sendVerificationEmail(user.email, verificationToken)

        return res.status(201).json({
            message: "User created Successfully",
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log('Error in Signup Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// verify-email controller
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification Code",
                success: false
            })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            message: "Email verified successfully",
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log('Error in Email-verification Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// login controller  
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenandSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log('Error in Login Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// forget Email
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();
        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(201).json({
            message: "Password reset link sent to your email",
            success: true
        })

    } catch (error) {
        console.log('Error in forgot-password Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }

}

// reset password 
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(201).json({
                success: false,
                message: "Invalid or expired reset token"
            })
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();
        await sendResetSuccessEmail(user.email);

        res.status(201).json({
            message: "Password reset successfully. Redirecting to Login Page...",
            success: true
        })

    } catch (error) {
        console.log('Error in reset-password Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}
// logout controller
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out Successfully",
        success: true
    })
}

// check auth endpoint
export const checkAuth = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log('Error in check-Auth Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}