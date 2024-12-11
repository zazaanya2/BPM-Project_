import React, { useState, useEffect } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import Button from "../../../part/Button";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Edit({ onChangePage }) {
  const [peraturanData, setPeraturanData] = useState([]);
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  const { id } = useParams(); // Mengambil ID dari URL

  // Indeks data untuk pagination
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_LINK}/api/MasterPeraturan/GetDataPeraturanById/${id}`, // Menggunakan ID dalam URL
        {
          method: "POST", // Gunakan GET untuk mengambil data berdasarkan ID
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      // Ubah groupedBerita menjadi array dan set data
      setData(result);
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

  const title = "Instrumen APS";
  const breadcrumbs = [
    { label: "Instrumen APS", href: "/peraturan/aps" },
    { label: "Dokumen Instrumen APS" },
  ];

  // Mendapatkan instance navigate
  const navigate = useNavigate();

  const handleEdit = (item) => {
    console.log(item); // Cek apakah item memiliki 'dok_id'
    if (item && item.dok_id) {
      navigate("/peraturan/aps/edit", {
        state: { editData: item, dokId: item.dok_id },
      });
    } else {
      console.log("dok_id tidak ditemukan", item); // Menangani kasus tidak ada dok_id
    }
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
                key: item.dok_id, // Make sure dok_id is available here
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
