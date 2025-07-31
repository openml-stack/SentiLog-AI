import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

function UserProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(""); // From DB
  const [previewPhoto, setPreviewPhoto] = useState(null); // Preview blob
  const [profilePhotoFile, setProfilePhotoFile] = useState(null); // File to upload

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
        console.log(response.data)

        setProfilePhoto(response.data.profilephoto); // This should be a URL or path
        setEmail(response.data.email);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
      } catch (err) {
        console.log(err);
      }
    }
    getDetails()
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

      console.log(response)
      if (response.status===200) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 min-h-screen flex-col relative overflow-hidden h-screen w-screen">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[30rem] h-[30rem] bg-gradient-to-br from-purple-300 to-blue-200 rounded-full opacity-25 blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-gradient-to-tr from-pink-300 to-yellow-200 rounded-full opacity-25 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200 to-cyan-200 rounded-full opacity-15 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full opacity-10 blur-[90px]" />
      </div>

      {/* Profile form */}
      <div className="flex justify-center px-4 mt-24">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-gradient-to-br from-blue-200/50 via-purple-100/40 to-pink-200/50 backdrop-blur-xl p-6 md:p-12 shadow-xl border border-white/20 dark:border-white/10 dark:bg-white/10 rounded-3xl w-full max-w-3xl relative z-10 flex flex-col items-center gap-6"
        >
          {/* Profile photo upload */}
          <label htmlFor="profileUpload" className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-indigo-500 shadow-md group-hover:opacity-80 transition-all">
              {previewPhoto || profilePhoto ? (
                <img
                  src={previewPhoto || profilePhoto}
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
              id="profileUpload"
              accept="image/jpeg, image/png"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
            <input
              type="text"
              placeholder="First Name"
              className="rounded-xl text-black text-center w-full py-2 px-4 shadow-md bg-white/80"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-xl text-black text-center w-full py-2 px-4 shadow-md bg-white/80"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="rounded-xl text-black text-center w-full max-w-md py-2 px-4 shadow-md bg-white/80 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-8 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl shadow-md transition-all duration-200"
          >
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
