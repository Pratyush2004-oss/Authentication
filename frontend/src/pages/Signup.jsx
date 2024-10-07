import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input';
import { KeyRound, Mail, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PAsswordStrengthMeter';
import { useAuthStore } from '../store/authStore';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { signup, error, loading } = useAuthStore();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, name);
            navigate('/verify-email');
        } catch (error) {
            console.log(error)
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
                <h2 className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text'>Create Account</h2>

                <form onSubmit={handleSignup}>
                    <Input
                        icon={User}
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={KeyRound}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Password strength meter */}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? <span className='loading loading-bars'></span> : 'Sign Up'}
                    </motion.button>
                </form>
            </div>
            <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
                <p className='text-sm text-gray-400'>Already have an account? {""}
                    <Link to={'/login'}><span className='font-bold text-green-400 hover:underline'>Login</span></Link>
                </p>
            </div>

        </motion.div>
    )
}

export default Signup