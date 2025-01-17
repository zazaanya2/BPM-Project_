import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

const UploadFileMulti = forwardRef(function UploadFileMulti(
  {
    id,
    label = "",
    isRequired = false,
    errorMsg = "Field ini wajib diisi.",
    onChange,
    initialFiles = [],
    maxSizeFile = 10 * 1024 * 1024,
    allowedFormats = ".pdf,.docx",
  },
  ref
) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const isInitialFilesProcessed = useRef(false);

  useEffect(() => {
    console.log(initialFiles);
    if (
      initialFiles &&
      Object.keys(initialFiles).length > 0 &&
      !isInitialFilesProcessed.current
    ) {
      console.log("jalan");
      isInitialFilesProcessed.current = true;

      // Mengambil seluruh file yang berupa string atau tipe File dari semua array dalam initialFiles
      const allFiles = Object.values(initialFiles).flatMap((fileGroup) =>
        fileGroup
          .filter((file) => typeof file === "string" || file instanceof File) // Ambil string dan File
          .map((file) => {
            if (typeof file === "string") {
              return {
                type: "path",
                value: file.replace(/\"/g, "").trim(), // Bersihkan tanda kutip dan spasi
                name: file.split("/").pop(), // Ambil nama file dari path
              };
            } else if (file instanceof File) {
              return {
                type: "file",
                value: file, // Simpan objek File
                name: file.name, // Ambil nama file dari objek File
              };
            }
          })
      );

      setFiles(allFiles);
    }
  }, [initialFiles]);

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
      setFiles([]);
      setError(false);
      onChange([]);
    },
    focus() {
      inputRef.current?.focus();
    },
  }));

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Validasi format file
    const allowedExtensions = allowedFormats
      .split(",")
      .map((ext) => ext.trim().replace(/^\./, "").toLowerCase());
    const invalidFiles = selectedFiles.filter(
      (file) =>
        !allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
    );
    if (invalidFiles.length > 0) {
      alert(
        `File dengan format tidak diizinkan ditemukan. Format yang diizinkan: ${allowedFormats}`
      );
      inputRef.current.value = ""; // Kosongkan input field
      return;
    }

    // Validasi ukuran file
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > maxSizeFile
    );
    if (oversizedFiles.length > 0) {
      alert(
        `File dengan ukuran melebihi ${
          maxSizeFile / (1024 * 1024)
        } MB ditemukan.`
      );
      inputRef.current.value = ""; // Kosongkan input field
      return;
    }

    const validFiles = selectedFiles.map((file) => ({
      type: "file",
      value: file,
      name: file.name,
    }));

    setFiles((prev) => {
      const updatedFiles = [...prev, ...validFiles];
      onChange(updatedFiles.map((item) => item.value));
      return updatedFiles;
    });

    inputRef.current.value = ""; // Kosongkan input setelah memproses file
    if (isRequired) setError(false);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      onChange(updatedFiles.map((item) => item.value));
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
        className={`file-list-container form-control ms-0 m-3 p-3 ${
          error ? "border-danger" : ""
        }`}
        style={{
          border: "2px dashed #ddd",
          borderRadius: "8px",
          minHeight: "100px",
        }}
      >
        {files.length > 0 ? (
          <ul className="file-list">
            {files.map((item, index) => (
              <li
                key={index}
                className="file-item d-flex justify-content-between"
              >
                <span>{item.name}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveFile(index)}
                  type="button"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-muted">No Files Selected</span>
        )}
      </div>

      <input
        type="file"
        id={id}
        name={id}
        ref={inputRef}
        className={`form-control mt-2 ${error ? "is-invalid" : ""}`}
        accept={allowedFormats}
        onChange={handleFileChange}
        multiple
      />
      {error && <span className="text-danger small">{errorMsg}</span>}

      <style>
        {`
          .file-list-container:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .file-list {
            list-style: none;
            padding: 0;
          }
          .file-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding: 4px 0;
          }
        `}
      </style>
    </div>
  );
});

export default UploadFileMulti;
