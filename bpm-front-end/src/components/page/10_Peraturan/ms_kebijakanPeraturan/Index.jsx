import React, { useState, useEffect } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import SearchField from "../../../part/SearchField";
import Button from "../../../part/Button";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";
import Filter from "../../../part/Filter";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Index({ onChangePage }) {
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  const [searchKeyword, setSearchKeyword] = useState(""); // Keyword pencarian
  const [selectedYear, setSelectedYear] = useState(""); // Filter tahun

  const navigate = useNavigate();
  // Indeks data untuk pagination
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const resetFilter = () => {
    setSearchKeyword("");
    setSelectedYear("");
  };

  // Fetch data dari API
  const fetchData = async () => {
    const parameters = {};
    for (let i = 1; i <= 50; i++) {
      parameters[`param${i}`] = null; // Isi semua parameter dengan null
    }
    try {
      const response = await fetch(
        `${API_LINK}/MasterPeraturan/GetDataDokumen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parameters),
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

  const handleDelete = async (id) => {
    // Menyiapkan parameter untuk API
    const parameters = { dok_id: id, dok_modif_by: "author" };
    for (let i = 3; i <= 50; i++) {
      parameters[`param${i}`] = null; // Isi semua parameter tambahan dengan null
    }

    console.log("Parameters dikirim:", parameters); // Debug log parameter

    // Menampilkan konfirmasi ke pengguna
    const confirm = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus dokumen ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    // Jika pengguna mengonfirmasi penghapusan
    if (confirm.isConfirmed) {
      try {
        // Mengirimkan permintaan ke server
        const response = await fetch(
          `${API_LINK}/MasterPeraturan/DeleteDokumen`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parameters),
          }
        );

        console.log("Response status:", response.status); // Debug log status respons

        if (!response.ok) {
          const errorText = await response.text(); // Mendapatkan pesan error dari server
          console.error("Error dari server:", errorText); // Log error server
          throw new Error("Gagal menghapus dokumen: " + errorText);
        }

        const result = await response.json(); // Jika respons berupa JSON
        console.log("Hasil respons:", result); // Debug log hasil respons

        Swal.fire("Berhasil", "Dokumen berhasil dihapus", "success");

        // Memperbarui data setelah penghapusan
        fetchData();
      } catch (err) {
        console.error("Error:", err); // Log error untuk debugging
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus dokumen", "error");
      }
    } else {
      console.log("Penghapusan dibatalkan oleh pengguna"); // Debug log jika pengguna membatalkan
    }
  };

  const handlePrint = async (item) => {
    try {
      const response = await fetch(`${API_LINK}/TrunduhDokumen/unduhDokumen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dok_id: item.key }),
      });

      if (!response.ok) throw new Error("Gagal mengunduh dokumen");

      // Cek Content-Type respons
      const contentType = response.headers.get("Content-Type");
      console.log("Content-Type:", contentType); // Menampilkan Content-Type untuk debugging

      // Periksa apakah file yang diterima adalah PDF
      if (!contentType || !contentType.includes("pdf")) {
        throw new Error("File yang diterima bukan PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dokumen.pdf"); // Nama file saat diunduh
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error mengunduh file:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEdit = (item) => {
    navigate("edit", { state: { editData: item } });
  };

  const handleDetail = (item) => {
    navigate("detail", { state: { detailData: item } });
  };
  const handleUpdateHistory = (item) => {
    navigate("updateHistory", { state: { updateHistoryData: item } });
  };
  // const handleDownload = (item) => {
  //   navigate("print", { state: { printData: item } });
  // };

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
          <div
            className={
              isMobile
                ? "table-container bg-white p-1 m-1 mt-0 rounded"
                : "table-container bg-white p-3 m-5 mt-0 rounded"
            }
          >
            <div className="row mb-3">
              <div className="col-12 d-flex flex-wrap align-items-center">
                <div className="me-auto flex-grow-1 mt-3 me-3">
                  <SearchField onChange={(value) => setSearchKeyword(value)} />
                </div>

                <div className="m-0">
                  <Filter>
                    <div className="mb-3">
                      <label htmlFor="yearPicker" className="mb-1">
                        Berdasarkan Tahun
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Masukkan Tahun"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        min="2000"
                        max={new Date().getFullYear()}
                      />
                    </div>

                    <Button
                      classType="btn btn-secondary"
                      title="Reset Filter"
                      label="Reset"
                      onClick={resetFilter}
                    />
                  </Filter>
                </div>
              </div>
            </div>
            <div className="table-container bg-white p-3 m-5 mt-0 rounded">
              <Table
                arrHeader={[
                  "No",
                  "Judul Dokumen",
                  // "Nomor Dokumen",
                  // "Tahun Dokumen",
                ]}
                headerToDataMap={{
                  No: "No",
                  "Judul Dokumen": "JudulDokumen",
                  // "Nomor Dokumen": "dok_nodok",
                  // "Tahun Dokumen": "dok_tahun",
                }}
                data={currentData.map((item, index) => ({
                  key: item.dok_id,
                  No: indexOfFirstData + index + 1,
                  JudulDokumen: item.dok_judul,
                  dok_nodok: item.dok_nodok,
                  dok_tahun: item.dok_tahun,
                }))}
                actions={[
                  "Detail",
                  "Edit",
                  "Toggle",
                  "Print",
                  "UpdateHistory",
                  "PrintHistory",
                ]}
                onDetail={(item) => {
                  handleDetail(item.key);
                }}
                onEdit={(item) => {
                  console.log("id yang harus dikirm: ", item.key);
                  handleEdit(item.key);
                }}
                onToggle={(item) => {
                  handleDelete(item.key);
                }}
                onPrint={(item) => {
                  handlePrint(item.key);
                }}
                onUpdateHistory={(item) => {
                  handleUpdateHistory(item.key);
                }}
              />

              <Paging
                pageSize={pageSize}
                pageCurrent={pageCurrent}
                totalData={data.length}
                navigation={handlePageNavigation}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
