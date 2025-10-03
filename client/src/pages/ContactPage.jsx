import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, HelpCircle, Mail, User } from "lucide-react";
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
        message,
      });

      if (res.status === 200) {
        alert("Form submitted");
        setData({ username: "", email: "", message: "" });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 transition-all duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We’d love to hear from
            you. Fill out the form below and our team will get back to you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Info Section */}
          <div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Let’s Stay Connected
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                SentiLog AI helps you understand emotional trends across
                personal journals and global news. Your feedback ensures we
                continue to improve and grow.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-500" />
                  support@sentilog.ai
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-pink-500" />
                  Reach us via the form — we usually respond within 24 hours.
                </li>
              </ul>
            </div>
            {/* Help Center Box */}
            <div className="mt-12 p-10 text-center rounded-2xl shadow-xl border transition-all duration-300 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex justify-center items-center gap-2">
                <HelpCircle className="w-7 h-7 text-blue-500" />
                Need more guidance?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Visit our Help Center to explore guides, tutorials, and FAQs to
                get the most out of SentiLog AI.
              </p>
              <div className="flex justify-center">
                <Link to="/help" className="w-full sm:w-auto">
                  <button className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 rounded-lg shadow-lg">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Go to Help Center
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col gap-6"
          >
            <div className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Send Us a Message
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-purple-500" />
                Name
              </label>
              <input
                name="username"
                type="text"
                value={data.username}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                Email
              </label>
              <input
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-pink-500" />
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={data.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="py-3 w-full rounded-lg font-semibold transition text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
