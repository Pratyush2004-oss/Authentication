import React from 'react'
import FloatShape from './components/FloatShape'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EmailVerification from './pages/EmailVerification'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'>
      <ToastContainer />
      <FloatShape color="bg-green-500" size='w-64 h-64' top="-5%" left='10%' delay={0} />
      <FloatShape color="bg-emerald-500" size='w-48 h-48' top="70%" left='80%' delay={5} />
      <FloatShape color="bg-lime-500" size='w-32 h-32' top="40%" left='-10%' delay={2} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/forgot-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App