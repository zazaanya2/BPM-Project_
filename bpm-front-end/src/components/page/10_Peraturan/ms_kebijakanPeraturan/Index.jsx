import React, { useState, useEffect } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import SearchField from "../../../part/SearchField";
import Button from "../../../part/Button";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";

export default function Read({ onChangePage }) {
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();

  // Indeks data untuk pagination
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_LINK}/api/MasterPeraturan/GetDataPeraturan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      // Filter data dengan dok_category = 1
      const filteredData = result.filter((item) => item.dok_category === "2");

      console.log(filteredData);
      // Simpan data yang difilter ke state
      setData(filteredData);
    } catch (err) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  const title = "KEBIJAKAN PERATURAN";
  const breadcrumbs = [
    { label: "Kebijakan Peraturan", href: "/peraturan/kebijakan" },
    { label: "Kebijakan Peraturan" },
  ];

  const handleEdit = (item) => {
    onChangePage("edit", { state: { editData: item } });
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className={isMobile ? "m-0" : "m-3"}>
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("index")}
            />
          </div>
          <div
            className={`p-3 m-5 mt-2 mb-0 ${isMobile ? "m-1" : ""}`}
            style={{ marginLeft: isMobile ? "10px" : "50px" }}
          >
            <Button
              iconName="add"
              classType="primary"
              label="Tambah Data"
              onClick={() => onChangePage("add")}
            />
          </div>
          <div className="table-container bg-white p-3 m-5 mt-0 rounded">
            <Table
              arrHeader={[
                "No",
                "Judul Dokumen",
                "Nomor Dokumen",
                "Tahun Dokumen",
              ]}
              headerToDataMap={{
                No: "No",
                "Judul Dokumen": "JudulDokumen",
                "Nomor Dokumen": "dok_nodok",
                "Tahun Dokumen": "dok_tahun",
              }}
              data={currentData.map((item, index) => ({
                key: item.dok_id,
                No: indexOfFirstData + index + 1,
                JudulDokumen: item.dok_judul,
                dok_nodok: item.dok_nodok,
                dok_tahun: item.dok_tahun,
              }))}
              actions={["Detail", "Edit", "Delete", "UpdateHistory"]}
              onEdit={handleEdit}
            />

            <Paging
              pageSize={pageSize}
              pageCurrent={pageCurrent}
              totalData={data.length}
              navigation={handlePageNavigation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
