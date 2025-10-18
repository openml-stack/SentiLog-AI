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
  const [passwordErrors, setPasswordErrors] = useState([]);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (!hasUpperCase) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!hasLowerCase) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!hasNumbers) {
      errors.push("Password must contain at least one number");
    }

    if (!hasSymbols) {
      errors.push("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    }

    return { errors, isValid: errors.length === 0 };
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
              setPasswordErrors([]); // Clear errors when user types
            }}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          
          {/* Password Requirements */}
          {newPassword && (
            <div className="mt-2">
              {!validatePassword(newPassword).isValid && (
                <div className="mt-2">
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                    ⚠️ Password does not meet security requirements:
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {(passwordErrors.length ? passwordErrors : validatePassword(newPassword).errors)
                      .map((errMsg, index) => (
                        <div key={index}>• {errMsg}</div>
                      ))}
                  </div>
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
            disabled={newPassword && !validatePassword(newPassword).isValid}
            className={`w-full py-3 rounded text-white transition-all duration-300 shadow-lg ${
              newPassword && !validatePassword(newPassword).isValid
                ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:scale-100'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105'
            }`}
            title={newPassword && !validatePassword(newPassword).isValid ? "Please meet all password requirements" : ""}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
