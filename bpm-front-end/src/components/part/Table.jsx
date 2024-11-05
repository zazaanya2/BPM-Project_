import Icon from "./Icon";

export default function Table({
  arrHeader,
  data,
  onDelete = () => {},
  onCancel = () => {},
  onFinal = () => {},
}) {
  // Ensure data is valid before rendering
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto">
        <div className="flex-fill">
          <table className="table table-hover table-striped table-light border">
            <thead>
              <tr>
                <th className="text-center" colSpan={arrHeader.length}>
                  Tidak ada data.
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex-fill">
        <table className="table table-hover table-striped table-light border">
          <thead>
            <tr>
              {arrHeader.map((header, index) => (
                <th key={"Header" + index} className="text-center">
                  {header}
                </th>
              ))}
              <th className="text-center">Aksi</th> {/* Menambahkan kolom aksi */}
            </tr>
          </thead>
          <tbody>
            {data.map((value, rowIndex) => {
              let colPosition = -1; // Initialize colPosition for each row
              return (
                <tr key={rowIndex}>
                  {arrHeader.map((column, colIndex) => {
                    colPosition++;
                    return (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                          textAlign: value["Alignment"]
                            ? value["Alignment"][colPosition]
                            : "left",
                        }}
                      >
                        {column === "Aksi"
                          ? generateActionButton(
                              column,
                              value[column],
                              `Action${rowIndex}${colIndex}`,
                              value["Key"],
                              value["Status"]
                            )
                          : value[column]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function generateActionButton(columnName, value, key, id, status) {
  if (columnName !== "Aksi") return value;

  const listButton = value.map((action) => {
    switch (action) {
      case "Cancel":
        return (
          <Icon
            key={key + action}
            name="delete-document"
            type="Bold"
            cssClass="btn px-1 py-0 text-danger"
            title="Batalkan"
            onClick={() => onCancel(id)}
          />
        );
      case "Delete":
        return (
          <Icon
            key={key + action}
            name="trash"
            type="Bold"
            cssClass="btn px-1 py-0 text-danger"
            title="Hapus"
            onClick={() => onDelete(id)}
          />
        );
      case "Final":
        return (
          <Icon
            key={key + action}
            name="gavel"
            type="Bold"
            cssClass="btn px-1 py-0 text-primary"
            title="Finalkan"
            onClick={() => onFinal(id)}
          />
        );
      default:
        return null; // Remove other actions for simplicity
    }
  });

  return listButton;
}
