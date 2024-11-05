import { forwardRef } from "react";

const DatePicker = forwardRef(function DatePicker(
  {
    id,
    label = "",
    size = "md",
    errorMsg,
    isRequired = false,
    isDisabled = false,
    ...props
  },
  ref
) {
  const sizeClass = size === "lg" ? "form-control-lg" : size === "sm" ? "form-control-sm" : "";

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
        id={id}
        name={id}
        type="date"  // Tipe input khusus tanggal
        className={`form-control ${sizeClass}`}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    </div>
  );
});

export default DatePicker;
