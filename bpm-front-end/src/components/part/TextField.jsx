import { forwardRef } from "react";

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
            ref={ref}
            disabled={isDisabled}
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
            ref={ref}
            disabled={isDisabled}
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
