import { useState } from "react";
import KriteriaKuesionerIndex from "./Index";
import KriteriaKuesionerAdd from "./Add";

const initialData = [
  { Key: "1", No: 1, "ID Kriteria Survei": "K001", "Kriteria Survei": "Kualitas Layanan", Status: "Aktif" },
  { Key: "2", No: 2, "ID Kriteria Survei": "K002", "Kriteria Survei": "Kecepatan Respon", Status: "Aktif" },
  { Key: "3", No: 3, "ID Kriteria Survei": "K003", "Kriteria Survei": "Keramahan Petugas", Status: "Tidak Aktif" },
  { Key: "4", No: 4, "ID Kriteria Survei": "K004", "Kriteria Survei": "Kebersihan Fasilitas", Status: "Aktif" },
  { Key: "5", No: 5, "ID Kriteria Survei": "K005", "Kriteria Survei": "Kenyamanan Ruangan", Status: "Aktif" },
];

export default function KriteriaKuesioner() {
  const [pageMode, setPageMode] = useState("index");
  const [kriteriaSurveiData, setKriteriaSurveiData] = useState(initialData);

  function handleSetPageMode(mode) {
    setPageMode(mode);
  }

  function handleAddKriteriaSurvei(newKriteria) {
    setKriteriaSurveiData(prevData => [
      ...prevData,
      {
        Key: (prevData.length + 1).toString(),
        No: prevData.length + 1,
        "ID Kriteria Survei": newKriteria.id_kriteria_survei,
        "Kriteria Survei": newKriteria.kriteria_survei,
        Status: "Aktif"
      }
    ]);
    setPageMode("index");
  }

  function handleToggleStatus(id) {
    setKriteriaSurveiData(prevData =>
      prevData.map(item =>
        item["ID Kriteria Survei"] === id
          ? { ...item, Status: item.Status === "Aktif" ? "Tidak Aktif" : "Aktif" }
          : item
      )
    );
  }

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return (
          <KriteriaKuesionerIndex
            onChangePage={handleSetPageMode}
            data={kriteriaSurveiData}
            onToggleStatus={handleToggleStatus}
          />
        );
      case "add":
        return (
          <KriteriaKuesionerAdd
            onChangePage={handleSetPageMode}
            onAddKriteria={handleAddKriteriaSurvei}
          />
        );
      default:
        return (
          <KriteriaKuesionerIndex
            onChangePage={handleSetPageMode}
            data={kriteriaSurveiData}
            onToggleStatus={handleToggleStatus}
          />
        );
    }
  }

  return <div>{getPageMode()}</div>;
}