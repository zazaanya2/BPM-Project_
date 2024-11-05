import { useState } from "react";

const UploadFoto = ({ id, label = "", isRequired = false, errorMsg }) => {
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
      {label && (
        <label htmlFor={id} className="form-label fw-bold">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
          {errorMsg && <span className="fw-normal text-danger"> {errorMsg}</span>}
        </label>
      )}
      <input
        type="file"
        id={id}
        name={id}
        className="form-control"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && (
        <div className="mt-3">
          <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default UploadFoto;
