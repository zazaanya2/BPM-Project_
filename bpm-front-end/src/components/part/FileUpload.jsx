import { forwardRef, useRef, useState, useImperativeHandle } from "react";

const FileUpload = forwardRef(function FileUpload(
  {
    formatFile = "",
    label = "",
    forInput = "",
    isRequired = false,
    isDisabled = false,
    errorMessage,
    hasExisting,
    maxSizeFile = 10 * 1024 * 1024, // Default 10 MB
    onChange,
    ...props
  },
  ref
) {
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > maxSizeFile) {
        setFileError(
          `Ukuran berkas tidak boleh lebih dari ${
            maxSizeFile / (1024 * 1024)
          } MB`
        );
        setFile(null);
        event.target.value = null;
      } else {
        setFileError("");
        setFile(selectedFile);

        if (onChange) {
          onChange(selectedFile);
        }
      }
    } else {
      setFile(null);
    }
  };

  useImperativeHandle(ref, () => ({
    validate() {
      if (isRequired && !file) {
        setFileError("Field ini wajib diisi.");
        return false;
      }
      if (file && file.size > maxSizeFile) {
        setFileError(
          `Ukuran berkas tidak boleh lebih dari ${
            maxSizeFile / (1024 * 1024)
          } MB`
        );
        return false;
      }
      setFileError("");
      return true;
    },
    reset() {
      setFile(null);
      setFileError("");
    },
    focus() {
      inputRef.current?.focus();
    },
  }));

  const handleFile = (file) => {
    if (!file) return;

    const error = validateFile(file);

    if (error) {
      setFileError(error);
      setSelectedFile(null);
    } else {
      setFileError("");
      setSelectedFile(file);

      // Jika onChange diteruskan sebagai prop, panggil dan kirim file ke parent
      if (onChange) {
        onChange(file); // Mengirim file ke komponen parent
      }
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      if (isDisabled) return;

      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [isDisabled, handleFile]
  );

 handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor={forInput} className="form-label fw-bold">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
        {errorMessage && (
          <span className="fw-normal text-danger">
            <br />
            {errorMessage}
          </span>
        )}

        {!isDisabled ? (
          <>
            <input
              ref={inputRef}
              type="file"
              id={forInput}
              name={forInput}
              accept={formatFile}
              className={`form-control mt-2 ${fileError ? "is-invalid" : ""}`}
              onChange={handleFileChange}
              {...props}
            />
            {fileError && (
              <span className="text-danger small">
                {fileError}
                <br />
              </span>
            )}
            <sub>
              Maksimum ukuran berkas adalah {maxSizeFile / (1024 * 1024)} MB
            </sub>
            {hasExisting && (
              <sub>
                <br />
                Berkas saat ini:{" "}
                <a
                  href={hasExisting}
                  className="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [Unduh Berkas]
                </a>
                <br />
                Unggah ulang jika ingin mengganti berkas yang sudah ada
              </sub>
            )}
          </>
        ) : (
          <>
            <br />
            {hasExisting ? (
              <a
                href={hasExisting}
                className="text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unduh berkas
              </a>
            ) : (
              "-"
            )}
          </>
        )}
      </div>
    </>
  );
});

export default FileUpload;
