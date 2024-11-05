import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextArea = ({ id, label, isRequired = false, errorMsg, onChange, ...props }) => {
  const handleEditorChange = (content) => {
    onChange && onChange(content);
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-bold">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
        <Editor
  id={id}
  init={{
    apiKey: '8aan1jhdusk13xws06e13w6e3igg00kygp1xubuhymmmg4r2', // Ganti dengan API key yang benar
    plugins: 'lists wordcount autoresize',
    toolbar: 'bold italic underline | bullist numlist | alignleft aligncenter alignright alignjustify',
    menubar: true,
    branding: true,
    statusbar: true,
  }}
  onEditorChange={handleEditorChange}
  {...props}
/>


      {errorMsg && <span className="small text-danger">{errorMsg}</span>}
    </div>
  );
};

export default TextArea;
