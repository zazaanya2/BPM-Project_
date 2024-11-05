import React from "react";
import Icon from "./Icon"; 

export default function Table({
  arrHeader,
  data,
  actions = [], 
  onDelete = () => {},
  onDetail = () => {},
  onEdit = () => {},
  onFinal = () => {},
  onPrint = () => {},
  onPrintHistory = () => {},
  onUpdateHistory = () => {},
}) {
  function generateActionButton(actionType, id) {
    switch (actionType) {
      case "Delete":
        return (
          <Icon
            type="Reguler"
            name="trash"
            cssClass="btn px-1 py-0 text-danger"
            title="Hapus"
            onClick={() => onDelete(id)}
          />
        );
      case "Detail":
        return (
          <Icon
            type="Reguler"
            name="eye"
            cssClass="btn px-1 py-0 text-info"
            title="Lihat Detail"
            onClick={() => onDetail(id)}
          />
        );
      case "Edit":
        return (
          <Icon
            type="Reguler"
            name="edit"
            cssClass="btn px-1 py-0 text-success"
            title="Ubah"
            onClick={() => onEdit(id)}
          />
        );
      case "Final":
        return (
          <Icon
            type="Reguler"
            name="flag"
            cssClass="btn px-1 py-0 text-primary"
            title="Finalkan"
            onClick={() => onFinal(id)}
          />
        );
      case "Print":
        return (
          <Icon
            type="Reguler"
            name="download"
            cssClass="btn px-1 py-0 text-secondary"
            title="Unduh File"
            onClick={() => onPrint(id)}
          />
        );
      case "PrintHistory":
        return (
          <Icon
            type="Reguler"
            name="file-circle-info"
            cssClass="btn px-1 py-0 text-warning"
            title="Riwayat Unduhan"
            onClick={() => onPrintHistory(id)}
          />
        );
      case "UpdateHistory":
        return (
          <Icon
            type="Reguler"
            name="user-time"
            cssClass="btn px-1 py-0 text-primary"
            title="Riwayat Pembaruan"
            onClick={() => onUpdateHistory(id)}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {arrHeader.map((header, index) => (
              <th
                key={`header-${index}`}
                className="text-center align-middle"
                style={{
                  backgroundColor: "#2654A1",
                  color: "#fff",
                }}
              >
                {header}
              </th>
            ))}
            <th
              className="text-center align-middle"
              style={{
                backgroundColor: "#2654A1",
                color: "#fff",
              }}
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {arrHeader.map((column, colIndex) => (
                  <td key={`cell-${rowIndex}-${colIndex}`} className="align-middle text-start">
                    {row[column]}
                  </td>
                ))}
                <td className="text-center align-middle">
                  {actions.map((action) =>
                    generateActionButton(action, row.Key)
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={arrHeader.length + 1} className="text-center">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
