import { response } from "express"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

// verification code mail 
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log('Email sent successfully', response)
    } catch (error) {
        console.log('error in sending verification mail', error)
        throw new Error("error sending verification mail ", error)
    }
}

// Welcome to website mail
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "b010525a-b725-4b72-be94-e80eec9769fb",
            template_variables: {
                "company_info_name": "Auth-Company",
                "name": name
            }
        })
        console.log('Welcome Email sent successfully : ', response);
    } catch (error) {
        console.log('Error in sending welcome email: ', error)
        throw new Error('Error in sending welcome Email', error)
    }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }];
    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        })
    } catch (error) {
        console.error("Error sending password reset email : ", error)
        throw new Error(`Error sending password reset email : ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        });

    } catch (error) {
        console.error("Error in sending email ", error)
        throw new Error(`Error sending reset success email : ${error}`)
    }
}