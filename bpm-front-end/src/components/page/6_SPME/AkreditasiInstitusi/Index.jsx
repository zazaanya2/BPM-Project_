import React, { useState, useRef, useEffect } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import SearchField from "../../../part/SearchField";
import HeaderText from "../../../part/HeaderText";
import Button from "../../../part/Button";
import Filter from "../../../part/Filter";
import { useFetch } from "../../../util/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { API_LINK } from "../../../util/Constants";
import Loading from "../../../part/Loading";
import SweetAlert from "../../../util/SweetAlert";
import Modal from "../../../part/Modal";
import DetailData from "../../../part/DetailData";

export default function Index({ onChangePage, title, breadcrumbs }) {
  const [data, setData] = useState([]);
  const [pageSize] = useState(10);
  const ModalRef = useRef();
  const [modalType, setModalType] = useState("");
  const [detail, setDetail] = useState(null);
  const [selectedDokRef, setSelectedDokRef] = useState(data[0] || null);
  const [sortedData, setSortedData] = useState(data);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalType, setModalType] = useState(""); 
  const ModalRef = useRef();
  const [detail, setDetail] = useState(null);

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setDetail(data);
    ModalRef.current?.open();
  };

  const handleEdit = (item) => {
    onChangePage("edit", { state: { idAkre: item.key } });
    console.log(item);
  };

  const handleDetail = (item) => {
    const selected = filteredData.find((obj) => obj.idAkre == item.Key);
    handleOpenModal("detail", selected);
  };

  const fetchData = async () => {
      const body = {
        p1: "",
      };
      try {
        const result = await useFetch(
          `${API_LINK}/MasterAkreditasi/GetDataAkreditasi`,
          body,
          "POST"
        );
        console.log(result);
        setData(result);
        setFilteredData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let Akredata = data;

    if (selectedYear) {
      Akredata = Akredata.filter((item) => item.akr_tahun_SK === parseInt(selectedYear));
    }

    if (searchKeyword) { 
      const lowerKeyword = searchKeyword.toLowerCase();
      Akredata = Akredata.filter(
        (item) =>
          (item.akr_nama && item.akr_nama.toLowerCase().includes(lowerKeyword)) ||
          (item.akr_no_SK && item.akr_no_SK.toLowerCase().includes(lowerKeyword))
      );
    }

    setFilteredData(Akredata);
  }, [searchKeyword, selectedYear, data]);

  const resetFilter = () => {
    setSearchKeyword("");
    setSelectedYear("");
  };

  const handleToggle = async (id) => {
    const confirm = await SweetAlert(
      "Konfirmasi",
      "Apakah Anda yakin ingin mengubah status dokumen ini?",
      "warning",
      "Ya, Ubah",
      null,
      "",
      true
    );

    if (confirm) {
      try {
        const currentItem = data.find((item) => item.akr_id === id);
        if (!currentItem) throw new Error("Dokumen tidak ditemukan");

        const newStatus = currentItem.akr_status === "Aktif" ? "Tidak Aktif" : "Aktif";

        const response = await useFetch(
          `${API_LINK}/MasterAkreditasi/DeleteAkreditasi`,
          { idAkre: id, status: newStatus },
          "POST"
        );

        if (response === "ERROR") throw new Error("Gagal mengubah status dokumen");

        SweetAlert("Berhasil", "Status dokumen berhasil diubah", "success");

        setData((prevData) =>
          prevData.map((item) =>
            item.akr_id === id ? { ...item, akr_status: newStatus } : item
          )
        );
      } catch (err) {
        console.error(err);
        SweetAlert("Gagal", "Terjadi kesalahan saat mengubah status dokumen", "error");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  return (
    <>
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="container mb-3">
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 style={{ color: "#2654A1", margin: "0", fontWeight: "700" }}>
                  {title}
                </h1>
              </div>

              <nav className="ms-1">
                <ol className="breadcrumb">
                  {breadcrumbs &&
                    breadcrumbs.map((breadcrumb, index) => (
                      <li
                        key={index}
                        className={`breadcrumb-item ${breadcrumb.href ? "" : "active"}`}
                        aria-current={breadcrumb.href ? undefined : "page"}
                      >
                        {breadcrumb.href ? (
                          <span
                            style={{
                              color: "#575050",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            {breadcrumb.label}
                          </span>
                        ) : (
                          <span>{breadcrumb.label}</span>
                        )}
                      </li>
                    ))}
                </ol>
              </nav>
            </div>

            <div className="mt-5 mb-0">
              <Button
                iconName="add"
                classType="primary"
                label="Tambah Akreditasi"
                onClick={() => onChangePage("add")}
              />
              <div className="row mt-3">
                <div className="col-lg-10 col-md-6">
                  <SearchField onChange={(value) => setSearchKeyword(value)} />
                </div>
                <div className="col-lg-2 col-md-6">
                  <Filter>
                    <div className="mb-3">
                      <label htmlFor="yearPicker" className="mb-1">
                        Berdasarkan Tahun
                      </label>
                      <input
                        id="yearPicker"
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
                      label="reset"
                      onClick={resetFilter}
                    />
                  </Filter>
                </div>
              </div>
            </div>
            <div className="table-container bg-white rounded">
              <Table
                arrHeader={["No", "Kode Prodi", "Nama Prodi", "Jenjang", "Wilayah", "No SK", "Tahun SK", "Peringkat", "Tanggal Kadaluwarsa"]}
                data={filteredData.map((item, index) => ({
                  key: item.akr_id || index,
                  No: indexOfFirstData + index + 1,
                  "Kode Prodi": item.akr_kode,
                  "Nama Prodi": item.akr_nama,
                  "Jenjang": item.akr_strata,
                  "Wilayah": item.akr_wilayah,
                  "No SK": item.akr_no_SK,
                  "Tahun SK": item.akr_tahun_SK,
                  "Tanggal Kadaluwarsa": item.akr_tgl_kadaluarsa ? item.akr_tgl_kadaluarsa.toString().split('T')[0] : '-',
                  "Peringkat": item.akr_peringkat,
                  "status": item.akr_status,
                }))}
                actions={(row) => {
                  // Jika status "Tidak Aktif", hanya tampilkan Toggle
                  if (row.status === "Tidak Aktif") {
                    return ["Toggle"];
                  }
                  // Jika status selain "Tidak Aktif", tampilkan semua actions
                  return [
                    "Detail",
                    "Edit",
                    "Toggle",
                  ];
                }}
                onDetail={handleDetail}
                onEdit={handleEdit}
                onToggle={(item) => handleToggle(item.key)}
              />

              <Paging
                pageSize={pageSize}
                pageCurrent={pageCurrent}
                totalData={filteredData.length}
                navigation={handlePageNavigation}
              />
            </div>
          </div>
        </div>
      </main>
      {modalType === "detail" && (
        <Modal
          ref={ModalRef}
          title="Detail Dokumen"
          size="full"
          Button2={
            <Button
              classType="secondary"
              label="Tutup"
              onClick={() => ModalRef.current.close()}
            />
          }
        >
          <div className="p-5 mt-0 bg-white rounded shadow">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <DetailData label="Nama Prodi" isi={detail.akr_nama} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Nomor Prodi" isi={detail.akr_kode} />  
                <DetailData label="Nomor SK" isi={detail.akr_no_SK} />               
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Wilayah" isi={detail.akr_wilayah} />
                <DetailData
                  label="Tanggal Kadaluarsa"
                  isi={new Date(detail.akr_tgl_kadaluarsa).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dibuat Oleh" isi={detail.akr_created_by} />
                <DetailData
                  label="Dibuat Tanggal"
                  isi={new Date(detail.akr_created_date13ik).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dimodifikasi Oleh" isi={detail.akr_modif_by} />
                <DetailData
                  label="Dimodifikasi Tanggal"
                  isi={new Date(detail.akr_modif_date).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
    </>
    
  );
}
