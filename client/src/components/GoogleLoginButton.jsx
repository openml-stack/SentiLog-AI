import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Optional: set a flag before redirecting
    localStorage.setItem("googleAuthPending", "1");

    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-2"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;