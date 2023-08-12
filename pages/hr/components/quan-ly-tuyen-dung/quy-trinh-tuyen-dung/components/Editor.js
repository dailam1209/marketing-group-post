import React, { useEffect, useRef } from "react";

function MyEditor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, Editor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      // Editor: require("ckeditor5/build/ckeditor.js"),
    };
  }, []);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const text = new DOMParser().parseFromString(data, "text/html")
      .documentElement.textContent;
    onChange({ name: name, value: text });
  };
  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={Editor}
          data={value}
          value={value}
          onChange={handleEditorChange}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}
export default MyEditor;
