import React, { useEffect, useState, useRef } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";
import Button from "../../part/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { API_LINK, PERATURAN_FILE_LINK } from "../../util/Constants";
import { useFetch } from "../../util/useFetch";
import Loading from "../../part/Loading";
import Filter from "../../part/Filter";
import SearchField from "../../part/SearchField";
import DropDown from "../../part/Dropdown";
import moment from "moment";
import { useIsMobile } from "../../util/useIsMobile";

// Dynamically set title and breadcrumbs based on idMenu
let title = "Hallo";
let breadcrumbs = [];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Mengambil hanya bagian tanggal
};

const dataFilterSort = [
  { Value: "[Judul Peraturan] asc", Text: "Judul Proposal [↑]" },
  { Value: "[Judul Peraturan] desc", Text: "Judul Proposal [↓]" },
];

const statusFilterSort = [
  { Value: "Aktif", Text: "Aktif" },
  { Value: "Tidak Aktif", Text: "Tidak Aktif" },
];
const pageSize = 10;

export default function Read({ onChangePage }) {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const idMenu = location.state?.idMenu;
  const idData = location.state?.idData;
  const [pageCurrent, setPageCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedJudul, setSelectedJudul] = useState("");

  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await useFetch(
          `${API_LINK}/MasterPeraturan/GetDataRiwayatRevisiPeraturan`,
          {
            idMenu: idMenu,
            search: searchKeyword,
            year: selectedYear,
            status: selectedStatus,
            judul: selectedJudul,
            size: pageSize,
            page: pageCurrent,
            idData: idData,
          },
          "POST"
        );

        if (data.length > 0 && data[0].TotalCount !== undefined) {
          setTotalData(data[0].TotalCount); // Set hanya sekali
        }

        const formattedEvents = data.map((item) => {
          return {
            id: item.idDok,
            judulDok: item.judulDok,
            revisiDokFormatted: item.revisiDokFormatted,
            fileDok: item.fileDok,
            tglUnggah: formatDate(item.tglUnggah || ""),
            createdBy: item.createdBy,
            status: item.statusDok,
          };
        });

        setFilteredData(formattedEvents);
      } catch (error) {
        setError("Gagal mengambil data kegiatan");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [
    idMenu,
    searchKeyword,
    selectedJudul,
    selectedYear,
    selectedStatus,
    pageSize,
    pageCurrent,
  ]);

  useEffect(() => {
    if (idMenu === 39) {
      title = "Riwayat Pembaruan Peraturan";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/kebijakan" },
        { label: "Dokumen Kebijakan Peraturan" },
      ];
    } else if (idMenu === 40) {
      title = "Riwayat Pembaruan Peraturan Eksternal";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/eksternal" },
        { label: "Dokumen Kebijakan Eksternal" },
      ];
    } else if (idMenu === 41) {
      title = "Riwayat Pembaruan Instrumen APS";
      breadcrumbs = [
        { label: "Instrumen APS", href: "/peraturan/aps" },
        { label: "Dokumen Instrumen APS" },
      ];
    }

    // Set loading to false once idMenu is determined
    setLoading(false);
  }, [idMenu]);

  const resetFilter = () => {
    setSearchKeyword("");
    setSelectedYear("");
    setSelectedStatus("");
    setSelectedJudul("");
  };

  const handleToggle = (id) => {
    console.log("id hapus :", id);
    const updatedData = filteredData.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Aktif" ? "Tidak Aktif" : "Aktif" }
        : item
    );
    setFilteredData(updatedData);
  };

  if (loading) return <Loading />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="m-3 mb-0">
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("index", { idMenu: idMenu })}
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
                  <SearchField
                    onChange={(value) => setSearchKeyword(value)}
                    value={searchKeyword}
                  />
                </div>

                <div className="m-0">
                  <Filter>
                    <div className="mb-3">
                      <DropDown
                        arrData={dataFilterSort}
                        label="Urut Bedasarkan"
                        value={selectedJudul}
                        onChange={(e) => setSelectedJudul(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="yearPicker" className="mb-1 fw-bold">
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
                    <div className="mb-3">
                      <DropDown
                        arrData={statusFilterSort}
                        label="Status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
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

            <Table
              arrHeader={[
                "No",
                "Revisi Ke",
                "Judul Dokumen",
                "Nama Berkas (File)",
                "Tanggal Unggah",
                "Di Unggah Oleh",
              ]}
              data={filteredData.map((item, index) => ({
                Key: item.id,
                No: indexOfFirstData + index + 1,
                "Revisi Ke": item.revisiDokFormatted,
                "Judul Dokumen": item.judulDok,
                "Nama Berkas (File)": item.fileDok,
                "Tanggal Unggah": item.tglUnggah,
                "Di Unggah Oleh": item.createdBy,
                status: item.status,
              }))}
              linkColumns={["Nama Berkas (File)"]}
              FILE_LINK={PERATURAN_FILE_LINK}
              aksiIs={false}
            />

            <Paging
              pageSize={pageSize}
              pageCurrent={pageCurrent}
              totalData={totalData}
              navigation={handlePageNavigation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
