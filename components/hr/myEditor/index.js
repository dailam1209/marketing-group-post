import React, { useEffect, useRef } from "react";

function MyEditorNew({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, Editor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      Editor: require("@/components/ckeditor5/build/ckeditor"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={Editor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default MyEditorNew;
