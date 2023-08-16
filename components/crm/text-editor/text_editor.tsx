import React, { useState, useEffect, useRef } from "react";

export default function TextEditor({ title = null, className }: any) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("../../ckeditor5"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div
      className={`text_editor_${className}`}
      style={{ padding: "4.5px", display: "block" }}
    >
       <label className="title_label">{title}</label>
      {editorLoaded ? <CKEditor editor={ClassicEditor} /> : "loading..."}
    </div>
  );
}
