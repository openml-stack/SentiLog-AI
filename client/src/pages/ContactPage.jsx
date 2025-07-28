import { useState } from "react";
import api from "../axios";
export const ContactPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { username, email, message } = data;

  try {
    const res = await api.post("/api/contact", {
      username,
      email,
      message
    });

    if (res.status === 200) {
      alert("Form submitted");
      setData({
        username: "",
        email: "",
        message: ""
      });
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Error sending message");
  }
};

  return (
    <>
      <div className="flex flex-col justify-center items-center  w-full min-h-screen bg-white px-4">
        <div className="text-pink-600 font-bold font-serif text-2xl m-10">
          <p>Send Us A Message</p>
        </div>

        <form
          className="bg-pink-50 flex p-7 mx-4 flex-col gap-8 max-w-md w-full rounded-xl shadow-md items-center"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={data.username}
              onChange={handleChange}
              required
              className="bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-black rounded-lg p-3 transition"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
              className="bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-black rounded-lg p-3 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-gray-600" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              value={data.message}
              onChange={handleChange}
              required
              className="bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-black rounded-lg p-3 transition"
              placeholder="Enter your message"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg w-full py-3 transition">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};
