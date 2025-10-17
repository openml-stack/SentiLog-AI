import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import { ThemeContext } from '../context/ThemeContext';

export default function ResetPassword() {
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let strength = 0;
    let errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    } else {
      strength += 1;
    }

    if (!hasUpperCase) {
      errors.push("Password must contain at least one uppercase letter");
    } else {
      strength += 1;
    }

    if (!hasLowerCase) {
      errors.push("Password must contain at least one lowercase letter");
    } else {
      strength += 1;
    }

    if (!hasNumbers) {
      errors.push("Password must contain at least one number");
    } else {
      strength += 1;
    }

    if (!hasSymbols) {
      errors.push("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    } else {
      strength += 1;
    }

    return { strength, errors, isValid: errors.length === 0 };
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = (strength) => {
    if (strength === 0) return { color: 'bg-gray-300', text: '', width: '0%' };
    if (strength === 1) return { color: 'bg-red-500', text: 'Very Weak', width: '20%' };
    if (strength === 2) return { color: 'bg-orange-500', text: 'Weak', width: '40%' };
    if (strength === 3) return { color: 'bg-yellow-500', text: 'Fair', width: '60%' };
    if (strength === 4) return { color: 'bg-blue-500', text: 'Good', width: '80%' };
    if (strength === 5) return { color: 'bg-green-500', text: 'Strong', width: '100%' };
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setPasswordErrors(Array.from(new Set(passwordValidation.errors)));
      return;
    }

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
      // map server validation errors into inline passwordErrors to avoid duplication
      const serverErrors = err.response?.data?.errors;
      if (Array.isArray(serverErrors) && serverErrors.length > 0) {
        setPasswordErrors(Array.from(new Set(serverErrors)));
      } else {
        setError(err.response?.data?.message || 'Something went wrong');
      }
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
            onChange={(e) => {
              setNewPassword(e.target.value);
              const validation = validatePassword(e.target.value);
              setPasswordStrength(validation.strength);
            }}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          
          {/* Password Strength Meter */}
          {newPassword && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Password Strength:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength <= 2 ? 'text-red-500' : 
                  passwordStrength <= 3 ? 'text-yellow-500' : 
                  passwordStrength <= 4 ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {getPasswordStrengthInfo(passwordStrength).text}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthInfo(passwordStrength).color}`}
                  style={{ width: getPasswordStrengthInfo(passwordStrength).width }}
                ></div>
              </div>
              {passwordStrength < 5 && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {(passwordErrors.length ? passwordErrors : validatePassword(newPassword).errors)
                        .slice(0, 3)
                        .map((errMsg, index) => (
                          <div key={index}>• {errMsg}</div>
                        ))}
                </div>
              )}
            </div>
          )}
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
