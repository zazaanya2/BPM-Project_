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
      apiKey='8aan1jhdusk13xws06e13w6e3igg00kygp1xubuhymmmg4r2'
      onEditorChange={handleEditorChange}
      init={{
        // plugins: [
        //   // Core editing features
        //   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
        //   // Your account includes a free trial of TinyMCE premium features
        //   // Try the most popular premium features until Nov 17, 2024:
        //   'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
        //   // Early access to document converters
        //   'importword', 'exportword', 'exportpdf'
        // ],
        toolbar: 'undo redo | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
        exportword_converter_options: { 'document': { 'size': 'Letter' } },
        importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
      }}
    
    />


      {errorMsg && <span className="small text-danger">{errorMsg}</span>}
    </div>
  );
};



export default TextArea;

