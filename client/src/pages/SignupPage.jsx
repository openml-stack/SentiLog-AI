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
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Removed: Logging API URL in production is not safe
    if (import.meta.env.MODE !== "production") {
      console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
        setSuccess("Signed up successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);  // Redirect to Home page after signup
      } else {
        setError(data.message || `Signup failed with status ${res.status}`);
      }
    } catch (e) {
      setError("Network error");
      console.error("Network error during signup:", e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBackground theme={theme} />
      <div className="max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
          />
         
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Signup
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
