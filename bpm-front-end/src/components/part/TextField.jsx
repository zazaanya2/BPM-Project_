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
            onChange={(e) => setValue(e.target.value)}
            {...props}
          />
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
            onChange={(e) => setValue(e.target.value)}
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
        </>
      )}
    </>
  );
});

export default TextField;
