import React, { useState, useEffect, useRef } from "react";

export default function TextEditor({ title = null, className,cusId,setEditorContent,des }: any) {
  console.log("chchschashcek",cusId)
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  // const [editorContent, setEditorContent] = useState("");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    // editor.setData(setEditorContent)
  };
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
      {editorLoaded ? (
        <CKEditor data={des} onChange={handleEditorChange} editor={ClassicEditor} />
      ) : (
        "loading..."
      )}
    </div>
  );
}
