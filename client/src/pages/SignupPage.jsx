import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profilePhoto:null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("VITE_API_URL is:", import.meta.env.VITE_API_URL);

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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded"

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
