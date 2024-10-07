import { create } from 'zustand'
import axios from 'axios';
import { toast } from 'react-toastify';

const API_AUTH = 'http://localhost:3000/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, loading: false })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Signing Up", loading: false });
            toast.error(error.response.data.message)
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, loading: false });
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying Email", loading: false })
            toast.error(error.response.data.message);
            throw error;
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, loading: false });
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging In", loading: false })
            toast.error(error.response.data.message);
            throw error;
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_AUTH}/logout`)
            set({ user: null, isAuthenticated: false, error: null, loading: false })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            set({ error: "Error logging out", loading: false })
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_AUTH}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ error: null, isCheckingAuth: false })
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({ loading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_AUTH}/forgot-password`, { email });
            set({ message: response.data.message, loading: false });
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ loading: false, error: error.response.data.message || "Error sending reset password email" })
            toast.error(error.response.data.message || "Error sending reset password email");
            throw error;
        }

    },

    resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/reset-password/${token}`, { password });
            set({ message: response.data.message, loading: false });
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            set({ loading: false, error: error.response.data.message || "Error resetting password" })
            toast.error(error.response.data.message || "Error resetting password");
            throw error;
        }

    }


}))