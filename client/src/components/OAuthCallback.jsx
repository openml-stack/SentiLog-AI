import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const state = searchParams.get("state");
        const token = searchParams.get("token");
        const userB64 = searchParams.get("user");
        const provider = searchParams.get("provider");

        console.log("OAuth callback received:", { code: !!code, error, provider, token: !!token });

        if (error) {
          setError(`OAuth Error: ${error}`);
          setLoading(false);
          return;
        }

        // Method 1: Direct token and user data in URL (from backend redirect)
        if (token) {
          localStorage.setItem("token", token);
          
          // Handle user data if provided
          if (userB64) {
            try {
              const userJson = atob(userB64);
              const user = JSON.parse(userJson);
              localStorage.setItem("user", JSON.stringify(user));
              console.log("User authenticated via OAuth:", user);
            } catch (parseError) {
              console.warn("Failed to parse user data:", parseError);
            }
          }
          
          // Redirect to intended page
          const redirectUrl = localStorage.getItem("oauth_redirect") || "/";
          localStorage.removeItem("oauth_redirect");
          navigate(redirectUrl);
          return;
        }

        if (!code) {
          setError("No authorization code received from OAuth provider");
          setLoading(false);
          return;
        }

        // Method 2: Exchange code for token via backend API
        console.log("Exchanging OAuth code for token...");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/oauth/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            code,
            state,
            provider: provider || 'github'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("OAuth exchange response:", data);

        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("User authenticated:", data.user);
          }
          
          const redirectUrl = localStorage.getItem("oauth_redirect") || "/";
          localStorage.removeItem("oauth_redirect");
          navigate(redirectUrl);
        } else {
          setError(data.message || data.error || "Authentication failed");
          setLoading(false);
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(`Authentication error: ${err.message}`);
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Completing Authentication...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please wait while we sign you in.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Authentication Failed
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors block w-full"
            >
              Back to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors block w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default OAuthCallback;
