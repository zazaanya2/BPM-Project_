import { forwardRef, useImperativeHandle, useState } from "react";

const TextField = forwardRef(function TextField(
  {
    id,
    label = "",
    size = "md",
    placeHolder = "",
    errorMsg,
    isRequired = false,
    isDisabled = false,
    maxChar, 
    ...props
  },
  ref
) {
  const [value, setValue] = useState(""); // State untuk nilai input

  // Fungsi reset untuk mengatur nilai kembali ke kondisi awal
  useImperativeHandle(ref, () => ({
    reset() {
      setValue(""); // Reset nilai input ke kosong
    }
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
  };

  return (
    <>
      {label !== "" && (
        <div className="mb-3">
          <label htmlFor={id} className="form-label fw-bold">
            {label}
            {isRequired && <span className="text-danger"> *</span>}
            {errorMsg && (
              <span className="fw-normal text-danger"> {errorMsg}</span>
            )}
          </label>
          <input
            id={id}
            name={id}
            type="text"  // Tipe input statis sebagai "text"
            className={`form-control ${sizeClass}`}
            placeholder={placeHolder}
            disabled={isDisabled}
            value={value}
            onChange={handleChange} // Menggunakan handleChange untuk memantau panjang input
            maxLength={maxChar} // Menambahkan maxLength ke input
            {...props}
          />
          {/* Menampilkan sisa karakter jika maxChar diberikan */}
          {maxChar && (
            <div className="small text-muted mt-1">
              {value.length}/{maxChar} characters
            </div>
          )}
        </div>
      )}
      {label === "" && (
        <>
          <input
            id={id}
            name={id}
            type="text"  // Tipe input statis sebagai "text"
            className={`form-control ${sizeClass} mb-3`}
            placeholder={placeHolder}
            disabled={isDisabled}
            value={value}
            onChange={handleChange} // Menggunakan handleChange untuk memantau panjang input
            maxLength={maxChar} // Menambahkan maxLength ke input
            {...props}
          />
          {errorMsg && (
            <span className="small ms-1 text-danger">
              {placeHolder.charAt(0).toUpperCase() +
                placeHolder.slice(1).toLowerCase() +
                " " +
                errorMsg}
            </span>
          )}
          {/* Menampilkan sisa karakter jika maxChar diberikan */}
          {maxChar && (
            <div className="small text-muted mt-1">
              {value.length}/{maxChar} characters
            </div>
          )}
        </>
      )}
    </>
  );
});

export default TextField;
