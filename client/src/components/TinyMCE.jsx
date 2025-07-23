import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ text, setText }) => {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  return (
    <div className="p-4 bg-transparent rounded-md">
      <Editor
        apiKey={apiKey}
        value={text}
        init={{
          menubar: false,
          statusbar: false,
          plugins: "lists",
          toolbar: "bold italic forecolor fontsizeselect",
          branding: false,
          height: 250,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content) => setText(content)}
      />
    </div>
  );
};

export default TinyEditor;
