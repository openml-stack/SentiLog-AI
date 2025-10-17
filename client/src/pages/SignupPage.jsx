import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { ThemeContext } from "../context/ThemeContext";

function SignupPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profilePhoto: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setError("");
    setSuccess("");

    if (name === "profilePhoto") {
      const file = files?.[0];

      if (!file) return;

      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        setError("Only JPEG or PNG files are allowed.");
        setForm((prev) => ({ ...prev, profilePhoto: null }));
        return;
      }
      if (file.size > maxSize) {
        setError("File size must be less than 2MB.");
        setForm((prev) => ({ ...prev, profilePhoto: null }));
        return;
      }

      setForm((prev) => ({ ...prev, profilePhoto: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      
      // Clear inline password errors when user edits password
      if (name === "password") {
        setPasswordErrors([]);
        const validation = validatePassword(value);
        setPasswordStrength(validation.strength);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate password before submission
    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid) {
      // show inline password errors and do NOT set the global `error` state
      setPasswordErrors(Array.from(new Set(passwordValidation.errors)));
      setLoading(false);
      return;
    }

    if (import.meta.env.MODE !== "production") {
      console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);
    }

    try {
      const formData = new FormData();
      formData.append("firstname", form.firstname);
      formData.append("lastname", form.lastname);
      formData.append("email", form.email);
      formData.append("password", form.password);

      if (form.profilePhoto) {
        formData.append("profilePhoto", form.profilePhoto); 
      }

      if (import.meta.env.MODE !== "production") {
        console.log("FormData being sent:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        body: formData,
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        console.warn("Response body not JSON or empty.");
      }

      if (import.meta.env.MODE !== "production") {
        console.log("Received response status:", res.status);
        console.log("Received response data:", data);
      }

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Signed up successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        // If server returns structured validation errors, show them inline instead of repeating globally
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          setPasswordErrors(Array.from(new Set(data.errors)));
        } else {
          setError(data.message || `Signup failed with status ${res.status}`);
        }
      }
    } catch (e) {
      setError("Network error");
      console.error("Network error during signup:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignup = () => {
    localStorage.setItem("oauth_redirect", "/");
    const githubOAuthUrl = `${import.meta.env.VITE_API_URL}/api/auth/github`;
    window.location.href = githubOAuthUrl;
  };

  const handleGoogleSignup = () => {
    console.log("Google OAuth signup initiated");
    console.log("API URL:", import.meta.env.VITE_API_URL);
    
    if (!import.meta.env.VITE_API_URL) {
      alert("Configuration error: API URL not set. Please check your .env file.");
      return;
    }
    
    localStorage.setItem("oauth_redirect", "/");
    const googleOAuthUrl = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    console.log("Redirecting to:", googleOAuthUrl);
    window.location.href = googleOAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBackground theme={theme} />
      <div className="max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create your account
        </h2>
        
        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full mb-3 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 31.7 29.4 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C34 5.6 29.3 3.6 24 3.6 12.5 3.6 3.6 12.5 3.6 24S12.5 44.4 24 44.4 44.4 35.5 44.4 24c0-1.1-.1-2.3-.3-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.7 1.1 7.7 2.9l5.7-5.7C34 5.6 29.3 3.6 24 3.6 16.3 3.6 9.6 7.8 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44.4c5.3 0 10.1-2 13.6-5.3l-6.3-5.2c-2 1.4-4.6 2.2-7.3 2.2-5.4 0-9.8-3.3-11.4-8l-6.6 5.1C9.3 40.2 16 44.4 24 44.4z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.5 5.3-6.6 5.9l6.3 5.2c-.4.3 9.4-6.6 8.6-19.6z"/>
          </svg>
          Sign up with Google
        </button>

        {/* GitHub OAuth Button */}
        <button
          onClick={handleGitHubSignup}
          disabled={loading}
          className="w-full mb-4 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          Sign up with GitHub
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/90 dark:bg-gray-800/90 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
          <div className="flex justify-center">
            <label htmlFor="profilePhoto" className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-indigo-500 shadow-md group-hover:opacity-80 transition-all">
                {form.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(form.profilePhoto)}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-300 text-center px-2">
                    Upload Photo
                  </span>
                )}
              </div>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded w-full pr-12
               text-gray-900 dark:text-gray-100 placeholder-gray-400
               bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm
               disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer
               outline-none focus:outline-none focus-visible:outline-none active:outline-none 
               focus:ring-0 focus:border-0 focus:shadow-none active:bg-transparent hover:bg-transparent
               [&:focus]:outline-none [&:active]:outline-none"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
              ) : (
                <Eye size={20} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
              )}
            </button>
          </div>
          
          {/* Password Strength Meter */}
          {form.password && (
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
                      {/* prefer client-side `passwordErrors` when available to avoid duplication */}
                      {(passwordErrors.length ? passwordErrors : validatePassword(form.password).errors)
                        .slice(0, 3)
                        .map((errMsg, index) => (
                          <div key={index}>• {errMsg}</div>
                        ))}
                    </div>
                  )}
            </div>
          )}
         
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white transition-all duration-300 shadow-lg font-semibold ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;