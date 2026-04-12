import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import Button from "../components/Button.jsx"
import { useUser } from '../context/UserContext';
import BackToTopButton from "../components/BackToTop.jsx";

function UserProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useUser();

  useEffect(() => {
    async function getDetails() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/user-profile`,
          { token }
        );

        if (!response.data) return;

        setProfilePhoto(response.data.profilephoto);
        setEmail(response.data.email);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
      } catch (err) {
        console.log(err);
      }
    }
    getDetails();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setPreviewPhoto(URL.createObjectURL(file));
      setProfilePhotoFile(file);
    } else {
      alert("Only JPEG or PNG images are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("token", token);
      if (profilePhotoFile) {
        formData.append("profilePhoto", profilePhotoFile);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/user-profile-update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        updateUser(response.data.user);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      alert(`Profile update failed: ${error.message}. Please check the console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("registered");
        alert("Your account has been deleted successfully.");
        window.location.href = "/signup";
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen px-4 py-16 flex justify-center items-start relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[30rem] h-[30rem] bg-gradient-to-br from-sky-300 to-blue-200 rounded-full opacity-25 blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-gradient-to-tr from-blue-300 to-blue-200 rounded-full opacity-25 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-sky-200 rounded-full opacity-15 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full opacity-10 blur-[90px]" />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

        {/* Upload photo */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profileUpload" className="relative cursor-pointer group">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300 group-hover:opacity-80 transition-all">
              {previewPhoto || profilePhoto ? (
                <img
                  src={previewPhoto || profilePhoto}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-sm text-gray-500">Upload</span>
              )}
            </div>
            <input
              type="file"
              id="profileUpload"
              accept="image/jpeg, image/png"
              onChange={handlePhotoChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>

          <button
            type="button"
            className="mt-4 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm shadow"
            onClick={() => fileInputRef.current.click()}
          >
            Change Profile Picture
          </button>
        </div>

        {/* Info inputs */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Change Password */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="ml-2 p-2 bg-gray-300 hover:bg-gray-500 rounded-md"
              >
                ➜
              </button>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 text-white rounded-lg shadow hover:opacity-90 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
        {/* Divider */}
        <div className="my-10 border-t-2 border-dashed border-purple-300" />

        {/* Delete Account Section */}
        <div className="mt-4 p-6 bg-red-100/60 border border-red-400 rounded-xl shadow-inner max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12H4m16 0l-4 4m4-4l-4-4"
              />
            </svg>
            Delete Account
          </h3>
          <p className="text-sm text-red-700 mb-4">
            This action is <strong>irreversible</strong>. Once deleted, your data cannot be recovered.
          </p>
          <div className="flex justify-center">
            <Button setShowDeleteModal={setShowDeleteModal} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-red-600 mb-4">Delete Account</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete your account? This action is irreversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <BackToTopButton />
    </div>
  );
}

export default UserProfile;

