import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

function SignupPage() {
  const navigate = useNavigate();
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

    console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);

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

      console.log("Received response status:", res.status);
      console.log("Received response data:", data);

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
    <div className="auth-page-bg flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
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
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
          />
         
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
