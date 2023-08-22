import React, { useState, useEffect, useRef } from "react";

export default function TextEditor({ title = null, className,  infoCus }: any) {

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
  console.log(infoCus)
  return (
    <div
      className={`text_editor_${className}`}
      style={{ padding: "4.5px", display: "block" }}
    >
      <label className="title_label">{title}</label>
      {editorLoaded ? (
        <CKEditor data={infoCus?.thong_tin_mo_ta} editor={ClassicEditor} />
      ) : (
        "loading..."
      )}
    </div>
  );
}
