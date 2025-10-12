import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedAuth = localStorage.getItem('elegant-stitches-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        // Check if session is still valid (24 hours)
        const sessionExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - new Date(authData.loginTime).getTime() < sessionExpiry) {
          setIsAuthenticated(true);
          setUser(authData);
        } else {
          // Session expired, clear storage
          localStorage.removeItem('elegant-stitches-auth');
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('elegant-stitches-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('elegant-stitches-auth', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('elegant-stitches-auth');
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
