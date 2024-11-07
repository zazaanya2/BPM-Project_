import { useState } from "react";

const UploadFotoMulti = ({ id, label = "", isRequired = false, errorMsg }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const previewUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrls.push(reader.result);
        if (previewUrls.length === files.length) {
          setPreviews((prev) => [...prev, ...previewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
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
      <div className="preview-container form-control ms-0 m-3 p-3" style={{ border: "2px dashed #ddd", borderRadius: "8px", minHeight: "150px" }}>
        {previews.length > 0 ? (
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="img-thumbnail"
                  style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }}
                />
                <button
                  className="remove-btn"
                  onClick={() => handleRemovePreview(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-muted">No Images Selected</span>
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
        multiple
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
        .preview-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .preview-item {
          position: relative;
          display: inline-block;
        }
        .remove-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
        }
        .remove-btn:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default UploadFotoMulti;
