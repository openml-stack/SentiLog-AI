import React from "react";

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    className="border p-2 rounded w-full"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default TextInput; 