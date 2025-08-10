import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import AnimatedBackground from "../components/AnimatedBackground";

function SignupPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profilePhoto:null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
    }
  };

  // Function to validate email
  const validateMail = (mail) =>{
    mail = mail.trim();
    const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com", "zoho.com", "gmx.com"];


      if (!emailPattern.test(mail)) {
        return false;
      }

      const domain = mail.split('@')[1].toLowerCase();
      if (!validDomains.includes(domain)) {
        return false;
      }   
      
      return true;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Removed: Logging API URL in production is not safe
    if (import.meta.env.MODE !== "production") {
      console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);
    }

    // Adding proper validation for email
    if(!validateMail(form.email)){
      window.alert("Please enter a valid email !!");
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

     console.log(" FormData being sent:");
      for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
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

      // Only log response status/data in non-production
      if (import.meta.env.MODE !== "production") {
        console.log("Received response status:", res.status);
        console.log("Received response data:", data);
      }

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Signed up successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);  // Redirect to Home page after signup
      } else {
        setError(data.message || `Signup failed with status ${res.status}`);
      }
    } catch (e) {
      setError("Network error");
      console.error("Network error during signup:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignup = () => {
    // Store current page for redirect after OAuth
    localStorage.setItem("oauth_redirect", "/");
    
    // Redirect to your backend GitHub OAuth endpoint
    const githubOAuthUrl = `${import.meta.env.VITE_API_URL}/api/auth/github`;
    window.location.href = githubOAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBackground theme={theme} />
      <div className="max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create your account
        </h2>
        
        {/* GitHub OAuth Button */}
        <button
          onClick={handleGitHubSignup}
          className="w-full mb-4 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:scale-105"
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
         
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
        </form>
      </div>
    </div>
  );
}

export default SignupPage;