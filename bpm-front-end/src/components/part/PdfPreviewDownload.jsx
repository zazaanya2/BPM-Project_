import React from "react";

const PdfPreviewDownload = ({ judul, handleClick }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
  };

  const iconStyle = {
    width: "50px",
    height: "50px",
    color: "red",
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 5px",
  };

  const buttonStyle = {
    padding: "5px 10px",
    fontSize: "12px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <div>
        <i className="fi fi-sr-file-pdf" style={iconStyle}></i>
      </div>
      <div>
        <h3 style={titleStyle}>{judul}</h3>
        <button
          onClick={(e) => {
            e.preventDefault(); // Tambahkan ini jika ingin mencegah default behavior
            handleClick();
          }}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = buttonStyle.backgroundColor)
          }
        >
          Unduh Dokumen
        </button>
      </div>
    </div>
  );
};

export default PdfPreviewDownload;
