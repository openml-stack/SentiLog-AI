import React, { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder = "Password", name, required = true, className = "" }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        className={`p-3 border border-gray-300 dark:border-gray-600 rounded w-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 ${className}`}
        autoComplete="new-password"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-transparent border-none focus:outline-none z-50 min-w-0 min-h-0 p-0 overflow-visible mr-2"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-900 dark:text-white" style={{display:'block'}}>
            <path d="M1 12C2.73 7.61 7 4.5 12 4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5-5 0-9.27-3.11-11-7.5z" fill="currentColor"/>
            <circle cx="12" cy="12" r="3.5" fill="#fff"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" style={{display: show ? 'block' : 'none'}}/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-900 dark:text-white" style={{display:'block'}}>
            <path d="M1 12C2.73 7.61 7 4.5 12 4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5-5 0-9.27-3.11-11-7.5z" fill="currentColor"/>
            <circle cx="12" cy="12" r="3.5" fill="#fff"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
