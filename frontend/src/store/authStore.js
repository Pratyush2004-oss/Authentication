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

    signup: async (email, password, name) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_AUTH}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, loading: false })
            toast.success(response.data.message)
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
            toast.success(response.data.message)
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
            toast.success(response.data.message)
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging In", loading: false })
            toast.error(error.response.data.message);
            throw error;
        }
    }


}))