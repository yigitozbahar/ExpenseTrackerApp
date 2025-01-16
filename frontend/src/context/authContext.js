import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:5000/api/v1/";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${BASE_URL}auth/getuser`);
                if (response.data) {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            } catch (error) {
                console.error('Auth check error:', error);
                localStorage.removeItem('user');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const register = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/register`, userData);
            if (response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Kayıt işlemi başarısız oldu');
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login`, {
                email,
                password
            });
            
            if (response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Giriş başarısız');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${BASE_URL}auth/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('user');
            setUser(null);
            navigate('/login');
        }
    };

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    const value = {
        user,
        loading,
        error,
        setError,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 