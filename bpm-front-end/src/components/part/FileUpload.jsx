import React, { forwardRef } from "react";
import PropTypes from "prop-types";


const FileUpload = forwardRef(
  (
    {
      formatFile = "",
      label = "",
      forInput = "",
      isRequired = false,
      isDisabled = false,
      errorMessage = "",
      hasExisting = "",
      ...props
    },
    ref
  ) => {
    return (
      <div>
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
              type="file"
              id={forInput}
              name={forInput}
              accept={formatFile}
              className="form-control"
              ref={ref}
              {...props}
            />
            <sub>Maksimum ukuran berkas adalah 10 MB</sub>

            {hasExisting && (
              <sub>
                <br />
                Berkas saat ini:{" "}
                <a
                  href={hasExisting} // langsung gunakan `hasExisting` sebagai URL
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
                href={hasExisting} // gunakan `hasExisting` sebagai URL
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
    );
  }
);

export default FileUpload;
