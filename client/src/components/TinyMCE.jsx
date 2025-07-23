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
          skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? "oxide-dark" : "oxide",
          content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "default",
          content_style: `
            body {
              font-family:Helvetica,Arial,sans-serif;
              font-size:14px;
              color: ${window.matchMedia('(prefers-color-scheme: dark)').matches ? "#ffffff" : "#000000"};
              background-color: ${window.matchMedia('(prefers-color-scheme: dark)').matches ? "#1e1e2f" : "#ffffff"};
            }

            .tox-toolbar__primary {
              background-color: rgba(255,255,255,0.05) ;
              border-radius: 0.5rem;
               border: 1px solid rgba(255,255,255,0.08) ;
            }
          `,
        }}
        onEditorChange={(content) => setText(content)}
      />
    </div>
  );
};

export default TinyEditor;
