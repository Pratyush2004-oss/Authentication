import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../components/Input';
import { KeyRound, MoveLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import PasswordStrengthMeter from '../components/PAsswordStrengthMeter';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, resetPassword } = useAuthStore();
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        await resetPassword(token, password);

        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    } catch (error) {
      
    }

  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'
    >
      <div className='p-8'>
        <h2 className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text'>Change Password</h2>

        <form onSubmit={handleResetPassword}>
          <Input
            autoComplete='off'
            icon={KeyRound}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            autoComplete='off'
            icon={KeyRound}
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <PasswordStrengthMeter password={password} />
          <motion.button
            disabled={password !== confirmPassword || !password || !confirmPassword}
            className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
          >
            {loading ? <span className='loading loading-infinity'></span> : 'Change Password'}
          </motion.button>
        </form>
      </div>
      <div className='flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50'>
        <Link to={'/login'}><span className='flex gap-2 font-bold text-green-400 hover:underline'><MoveLeft />Back to Login</span></Link>
      </div>

    </motion.div>

  )
}

export default ResetPassword