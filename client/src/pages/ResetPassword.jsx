import React, { useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';

export default function ResetPassword() {
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      if (import.meta.env.MODE !== "production") {
        console.error("Network error during password reset:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBackground theme={theme} />
      <div className="max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Reset Password</h2>
        <form onSubmit={handleReset} className="flex flex-col gap-5">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
