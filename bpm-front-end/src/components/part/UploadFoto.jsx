import { useState } from "react";

const UploadFoto = ({ id, label = "", isRequired = false, errorMsg = "" }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      {/* Label Input File */}
      {label && (
        <label htmlFor={id} className="form-label fw-bold mt-3">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
          {errorMsg && <span className="fw-normal text-danger"> {errorMsg}</span>}
        </label>
      )}

      {/* Preview Container */}
      <div
        className="form-control m-3 p-3"
        style={{
          border: "2px dashed #ddd",
          borderRadius: "8px",
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail"
            style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }}
          />
        ) : (
          <span className="text-muted">No Image Selected</span>
        )}
      </div>

      {/* File Input */}
      <input
        type="file"
        id={id}
        name={id}
        className="form-control mt-2"
        accept="image/*"
        onChange={handleFileChange}
        style={{ cursor: "pointer" }}
      />

      {/* Custom Styling */}
      <style jsx>{`
        .form-control:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .img-thumbnail {
          border-radius: 8px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default UploadFoto;
