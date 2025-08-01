import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        console.warn("Response body not JSON or empty.");
      }

      console.log("Received response status:", res.status);
      console.log("Received response data:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");  // Redirect to Home page after login
      } else {
        setError(data.message || `Login failed with status ${res.status}`);
      }
    } catch (e) {
      setError("Network error");
      console.error("Network error during login:", e);
    }
  };

  return (
    <div className="auth-page-bg flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login to SentiLog
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
