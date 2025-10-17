import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Demo credentials (in real app, this would be handled by backend)
  const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear login error
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setLoginError('');

    // Simulate API call delay
    setTimeout(() => {
      if (formData.username === DEMO_CREDENTIALS.username && 
          formData.password === DEMO_CREDENTIALS.password) {
        // Login successful
        login({
          username: formData.username,
          loginTime: new Date().toISOString()
        });
        navigate('/admin');
      } else {
        setLoginError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setFormData({
      username: DEMO_CREDENTIALS.username,
      password: DEMO_CREDENTIALS.password
    });
  };

  return (
    <div className="min-h-screen bg-elegant-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-elegant-darkGold to-elegant-gold rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">🔐</span>
          </div>
          <h2 className="mt-6 text-4xl font-bold text-elegant-black font-elegant">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-[#4a3b30]">
            Sign in to access the Elegant Stitches Admin Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 text-sm font-medium">{loginError}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#4a3b30] mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-elegant-gold transition ${
                  errors.username ? 'border-red-500' : 'border-elegant-gold/30'
                }`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#4a3b30] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-elegant-gold transition ${
                  errors.password ? 'border-red-500' : 'border-elegant-gold/30'
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-elegant-darkGold to-elegant-gold hover:shadow-xl hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-elegant-cream rounded-lg border border-elegant-gold/30">
            <h3 className="text-sm font-semibold text-elegant-darkGold mb-2 font-elegant">Demo Credentials:</h3>
            <div className="text-xs text-[#4a3b30] space-y-1">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
            <button
              onClick={handleDemoLogin}
              className="mt-3 text-xs text-elegant-gold hover:text-elegant-darkGold underline"
              disabled={isLoading}
            >
              Fill demo credentials
            </button>
          </div>

          {/* Back to Site Link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-[#4a3b30] hover:text-elegant-gold transition font-medium"
            >
              ← Back to Elegant Stitches
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-[#4a3b30]">
            © 2025 Elegant Stitches. Secure Admin Access.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

