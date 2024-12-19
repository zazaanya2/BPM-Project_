import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import Button from "../../../part/Button";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";

export default function UpdateHistory({ onChangePage }) {
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  const location = useLocation();

  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const fetchData = async () => {
    const dokumentId = location.state.updateHistoryData;
    try {
      const response = await fetch(
        `${API_LINK}/TrunduhDokumen/lihatpembaharuan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ param1: dokumentId }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      console.log(result);

      // Simpan semua data ke state tanpa filter
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

  const title = "Dokumen Peraturan Eksternal";
  const breadcrumbs = [
    { label: "Peraturan", href: "peraturan/aps/updateHistory" },
    { label: "Dokumen Instrumen APS" },
  ];

  // Tampilkan pesan loading atau error jika diperlukan
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  // Render utama jika data sudah siap
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
            className={
              isMobile
                ? "table-container bg-white p-1 m-1 mt-0 rounded"
                : "table-container bg-white p-3 m-5 mt-0 rounded"
            }
          >
            <Table
              arrHeader={[
                "No",
                "Revisi ke",
                "Judul Dokumen",
                "Nama Berkas (File)",
                "Tanggal Unggah",
                "Diunggah Oleh",
              ]}
              headerToDataMap={{
                No: "No",
                "Revisi ke": "udo_revisi_ke",
                "Judul Dokumen": "dok_judul",
                "Nama Berkas (File)": "dok_file",
                "Tanggal Unggah": "dok_created_date",
                "Diunggah Oleh": "dok_created_by",
              }}
              data={currentData.map((item, index) => ({
                key: item.dok_id,
                No: indexOfFirstData + index + 1,
                udo_revisi_ke: item.udo_revisi_ke,
                dok_judul: item.dok_judul,
                dok_file: item.dok_file,
                dok_created_date: item.dok_created_date,
                dok_created_by: item.dok_created_by,
              }))}
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
