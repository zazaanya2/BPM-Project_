import { forwardRef, useImperativeHandle, useState, useRef } from "react";

const TextField = forwardRef(function TextField(
  {
    id,
    label = "",
    size = "md",
    placeHolder = "",
    errorMsg = "",
    isRequired = false,
    isDisabled = false,
    maxChar,
    ...props
  },
  ref
) {
  const [value, setValue] = useState(""); // State untuk nilai input
  const [error, setError] = useState(false); // State untuk validasi error
  const inputRef = useRef(null); // Referensi ke elemen input

  // Fungsi reset untuk mengatur nilai kembali ke kondisi awal
  useImperativeHandle(ref, () => ({
    reset() {
      setValue(""); // Reset nilai input ke kosong
      setError(false); // Reset error state
    },
    validate() {
      if (isRequired && !value.trim()) {
        setError(true);
        return false;
      }
      setError(false);
      return true;
    },
    focus() {
      inputRef.current.focus(); // Gunakan ref untuk memfokuskan elemen input
    },
    value,
  }));

  // Tentukan kelas ukuran input berdasarkan prop `size`
  const sizeClass = size === "lg" ? "form-control-lg" : size === "sm" ? "form-control-sm" : "";

  // Fungsi untuk menangani perubahan input dan membatasi panjang karakter
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxChar && newValue.length <= maxChar) {
      setValue(newValue); // Set nilai hanya jika panjangnya sesuai dengan maxChar
    } else if (!maxChar) {
      setValue(newValue); // Jika maxChar tidak ada, biarkan input bebas
    }
    if (isRequired) setError(!newValue.trim());
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-bold">
          {label}
          {isRequired && <span className="text-danger"> *</span>}
        </label>
      )}
      <input
        ref={inputRef} // Hubungkan ref ke elemen input
        id={id}
        name={id}
        type="text"
        className={`form-control ${sizeClass} ${error ? "is-invalid" : ""}`}
        placeholder={placeHolder}
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
        onBlur={() => {
          if (isRequired && !value.trim()) setError(true);
        }}
        maxLength={maxChar}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">{errorMsg || "Field ini wajib diisi."}</div>
      )}
      {maxChar && (
        <div className="small text-muted mt-1">
          {value.length}/{maxChar} characters
        </div>
      )}
    </div>
  );
});

export default TextField;
