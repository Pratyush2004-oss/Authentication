import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { AlignLeftIcon, Mail, MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { loading, forgotPassword } = useAuthStore();
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setIsSubmitted(true);
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'
        >
            <div className='p-8'>
                <h2 className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text'>Forgot Password</h2>
                {!isSubmitted ?
                    <form onSubmit={handleForgotPassword}>
                        <p className='p-3 text-center text-emerald-400'>Enter your email address and we'll send you a link to reset your password</p>
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            required
                        />
                        <motion.button
                            className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                        >
                            {loading ? <span className='loading loading-infinity'></span> : 'Send Reset Link'}
                        </motion.button>
                    </form>
                    :
                    <div>
                        <Mail className='p-4 mx-auto rounded-full size-24 bg-gradient-to-b from-green-500 to-emerald-600' />
                        <p className='p-3 text-center text-emerald-400'>If an account exists for {email}, you will recieve a password reset link shortly </p>
                    </div>
                }
            </div>
            <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
                <Link to={'/login'}><span className='flex gap-2 font-bold text-green-400 hover:underline'><MoveLeft />Back to Login</span></Link>
            </div>

        </motion.div>

    )
}

export default ForgotPassword