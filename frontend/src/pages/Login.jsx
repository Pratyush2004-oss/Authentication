import { KeyRound, Mail } from 'lucide-react';
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import Input from '../components/Input';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'
        >
            <div className='p-8'>
                <h2 className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text'>Welcome Back</h2>

                <form onSubmit={handleLogin}>
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='off'
                    />
                    <Input
                        autoComplete='off'
                        icon={KeyRound}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link className='text-sm text-white ' to={'/forgot-password'}>Forgot Password ?</Link>
                    <motion.button
                        className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                    >
                    {loading ? <span className='loading loading-infinity'></span> : 'Login'}
                    </motion.button>
                </form>
            </div>
            <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
                <p className='text-sm text-gray-400'>Don't have an account? {""}
                    <Link to={'/signup'}><span className='font-bold text-green-400 hover:underline'>Create Account</span></Link>
                </p>
            </div>

        </motion.div>
    )
}

export default Login