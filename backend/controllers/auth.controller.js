import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookies.js";

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
        generateTokenandSetCookie(res,user.id);
        return res.status(201).json({
            message: "User created Successfully",
            success: true,
            user: {
                ...user._doc,
                password:undefined,
            }
        })
        
    } catch (error) {
        console.log('Error in Signup Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}