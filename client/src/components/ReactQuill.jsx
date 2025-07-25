import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../quill-custom.css";

const QuillEditor = ({value, onChange}) => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div className="quill-wrapper">
      <ReactQuill
        key={isDark ? "dark" : "light"}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{color: []}, {background: []}],
            [{size: ["small", false, "large", "huge"]}],
          ],
        }}
        formats={["bold", "italic", "underline", "color", "background", "size"]}
        placeholder="Start typing your thoughts..."
      />
    </div>
  );
};

export default QuillEditor;
