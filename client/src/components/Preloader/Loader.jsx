import React from "react";
import "./Preloader.css";

function Loader() {
  return (
    <div>
      <div
        id="pre-loader"
        className="relative z-10 flex flex-col gap-10 items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-pink-50"
      >
        <h1 className="text-xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 bg-clip-text text-transparent animate-gradient-move">
            SentiLog
            <span className="relative inline-block px-2">
              <span className="text-white bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-500 dark:to-blue-700 px-2 py-1 rounded shadow-lg animate-glitch">
                AI
              </span>
            </span>
          </span>
          <br />
        </h1>
        <span className="text-gray-700 text-2xl font-bold">Loading ....</span>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
