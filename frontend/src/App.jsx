import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

import { useAuthStore } from "./store/authStore";

import Home from './pages/Home'
import LoadingSpinner from "./components/LoadingSpinner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import FloatShape from "./components/FloatShape";
import EmailVerificationPage from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }
  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className='relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'
    >
      <FloatShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;