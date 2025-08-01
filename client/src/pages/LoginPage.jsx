import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Disable button

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
        navigate("/");
      } else {
        setError(data.message || `Login failed with status ${res.status}`);
      }
    } catch (e) {
      setError("Network error");
      console.error("Network error during login:", e);
    } finally {
      setLoading(false); // Re-enable button
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
          disabled={loading}
          className={`w-full py-3 rounded text-white transition font-semibold
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
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
              Logging in...
            </span>
          ) : (
            "Login"
          )}
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
