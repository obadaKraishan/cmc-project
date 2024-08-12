import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the authenticated user
  const [loading, setLoading] = useState(true); // Manage the loading state
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (token) {
        try {
          // Validate the token and fetch user data
          const { data } = await api.get('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data); // Set the authenticated user
        } catch (error) {
          console.error('Failed to authenticate user:', error);
          localStorage.removeItem('token'); // Remove invalid token
        }
      }
      setLoading(false); // Set loading to false after the check
    };

    checkAuth(); // Run the authentication check
  }, []);

  // Handle user login
  const login = async (email, password) => {
    try {
      setLoading(true); // Start loading
      const response = await api.post('/api/auth/login', { email, password });
      setUser(response.data); // Set the authenticated user
      localStorage.setItem('token', response.data.token); // Save the token in localStorage
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
      throw error;
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle user registration
  const register = async (name, email, password) => {
    try {
      setLoading(true); // Start loading
      const response = await api.post('/api/auth/register', { name, email, password });
      setUser(response.data); // Set the authenticated user
      localStorage.setItem('token', response.data.token); // Save the token in localStorage
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : error.message);
      throw error;
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle user logout
  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
