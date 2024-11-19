import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";

const UploadFotoMulti = forwardRef(function UploadFotoMulti(
  { id, label = "", isRequired = false, errorMsg = "Field ini wajib diisi.", onChange, initialImages = [] },
  ref
) {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    validate() {
      if (isRequired && files.length === 0) {
        setError(true);
        return false;
      }
      setError(false);
      return true;
    },
    reset() {
      setPreviews([]);
      setFiles([]);
      setError(false);
      onChange([]); // Inform parent about reset
    },
    focus() {
      inputRef.current?.focus();
    },
  }));

  // Handle initial images (fetch from database)
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialPreviews = initialImages.map((image) => {
        const imageUrl = `${BERITAFOTO_LINK}${image}`; // Path gambar
        return {
          preview: imageUrl, // Menyimpan URL gambar untuk preview
          file: new File([], image, { type: 'image/jpeg' }), // Anda bisa mengganti tipe gambar sesuai dengan format
        };
      });
      setPreviews(initialPreviews.map(item => item.preview));
      setFiles(initialPreviews.map(item => item.file));
    }
  }, [initialImages]);
  

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previewUrls = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrls.push(reader.result);

        if (previewUrls.length === selectedFiles.length) {
          setPreviews((prev) => [...prev, ...previewUrls]);
          setFiles((prev) => [...prev, ...selectedFiles]);
          onChange([...files, ...selectedFiles]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (isRequired) setError(false); // Reset error state when a file is selected
  };

  const handleRemovePreview = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      onChange(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-bold mt-3">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}

      <div
        className={`preview-container form-control ms-0 m-3 p-3 ${error ? "border-danger" : ""}`}
        style={{
          border: "2px dashed #ddd",
          borderRadius: "8px",
          minHeight: "150px",
        }}
      >
        {previews.length > 0 ? (
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="img-thumbnail"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    borderRadius: "8px",
                  }}
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

      <input
        type="file"
        id={id}
        name={id}
        ref={inputRef}
        className={`form-control mt-2 ${error ? "is-invalid" : ""}`}
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
      {error && <span className="text-danger small">{errorMsg}</span>}

      <style>
        {`
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
        `}
      </style>
    </div>
  );
});

export default UploadFotoMulti;
