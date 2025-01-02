import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import SearchField from "../../part/SearchField";
import Button from "../../part/Button";
import Filter from "../../part/Filter";
import Modal from "../../part/Modal";
import DetailData from "../../part/DetailData";
import { SyncLoader } from "react-spinners";
import { useIsMobile } from "../../util/useIsMobile";
import Breadcrumbs from "../../part/Breadcrumbs";
import HeaderText from "../../part/HeaderText";
import { format } from "date-fns";
import { el, id } from "date-fns/locale";
import { API_LINK } from "../../util/Constants";
import { useFetch } from "../../util/useFetch";
import DropDown from "../../part/Dropdown";
import Loading from "../../part/Loading";

const data = [
  {
    idDok: 1,
    men_id: 5,
    namaKdo: "Document Title 1",
    dok_tgl_unduh: "2024-04-30 00:00:00",
    dok_tgl_akhir: "2020-03-28",
    dok_file: "file_1.pdf",
    controlDok: "Control-47",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    createdBy: "User1",
    createdDate: "2020-09-07 00:00:00",
    modifiedBy: "User17",
    modifiedDate: "2023-01-15 00:00:00",
    dok_nodok: "ND-9508",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 2,
    men_id: 8,
    namaKdo: "Document Title 2",
    dok_tgl_unduh: "2024-06-12 00:00:00",
    dok_tgl_akhir: "2020-01-11",
    dok_file: "file_2.pdf",
    controlDok: "Control-57",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    createdBy: "User2",
    createdDate: "2024-06-26 00:00:00",
    modifiedBy: "User5",
    modifiedDate: "2022-09-08 00:00:00",
    dok_nodok: "ND-2559",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 3,
    men_id: 3,
    namaKdo: "Document Title 3",
    dok_tgl_unduh: "2024-07-06 00:00:00",
    dok_tgl_akhir: "2022-11-03",
    dok_file: "file_3.pdf",
    controlDok: "Control-81",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    createdBy: "User3",
    createdDate: "2022-11-20 00:00:00",
    modifiedBy: "User14",
    modifiedDate: "2020-05-04 00:00:00",
    dok_nodok: "ND-3505",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 4,
    men_id: 3,
    namaKdo: "Document Title 4",
    dok_tgl_unduh: "2023-07-28 00:00:00",
    dok_tgl_akhir: "2022-10-20",
    dok_file: "file_4.pdf",
    controlDok: "Control-64",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    createdBy: "User4",
    createdDate: "2024-06-19 00:00:00",
    modifiedBy: "User10",
    modifiedDate: "2020-06-11 00:00:00",
    dok_nodok: "ND-7816",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 5,
    men_id: 7,
    namaKdo: "Document Title 5",
    dok_tgl_unduh: "2020-12-04 00:00:00",
    dok_tgl_akhir: "2022-08-10",
    dok_file: "file_5.pdf",
    controlDok: "Control-40",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    createdBy: "User5",
    createdDate: "2020-08-19 00:00:00",
    modifiedBy: "User12",
    modifiedDate: "2022-09-28 00:00:00",
    dok_nodok: "ND-1909",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 5,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 6,
    men_id: 3,
    namaKdo: "Document Title 6",
    dok_tgl_unduh: "2022-10-15 00:00:00",
    dok_tgl_akhir: "2020-06-26",
    dok_file: "file_6.pdf",
    controlDok: "Control-9",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    createdBy: "User6",
    createdDate: "2020-09-26 00:00:00",
    modifiedBy: "User20",
    modifiedDate: "2024-03-04 00:00:00",
    dok_nodok: "ND-7545",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 7,
    men_id: 7,
    namaKdo: "Document Title 7",
    dok_tgl_unduh: "2023-12-23 00:00:00",
    dok_tgl_akhir: "2020-10-21",
    dok_file: "file_7.pdf",
    controlDok: "Control-59",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    createdBy: "User7",
    createdDate: "2021-04-07 00:00:00",
    modifiedBy: "User20",
    modifiedDate: "2023-01-14 00:00:00",
    dok_nodok: "ND-2803",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 8,
    men_id: 9,
    namaKdo: "Document Title 8",
    dok_tgl_unduh: "2023-10-21 00:00:00",
    dok_tgl_akhir: "2020-10-16",
    dok_file: "file_8.pdf",
    controlDok: "Control-25",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    createdBy: "User8",
    createdDate: "2022-01-14 00:00:00",
    modifiedBy: "User17",
    modifiedDate: "2021-01-07 00:00:00",
    dok_nodok: "ND-9183",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 9,
    men_id: 3,
    namaKdo: "Document Title 9",
    dok_tgl_unduh: "2023-06-16 00:00:00",
    dok_tgl_akhir: "2024-01-17",
    dok_file: "file_9.pdf",
    controlDok: "Controlled Copy",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    createdBy: "User9",
    createdDate: "2023-10-20 00:00:00",
    modifiedBy: "User10",
    modifiedDate: "2024-08-05 00:00:00",
    dok_nodok: "ND-9283",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 10,
    men_id: 8,
    namaKdo: "Document Title 10",
    dok_tgl_unduh: "2023-05-06 00:00:00",
    dok_tgl_akhir: "2024-01-26",
    dok_file: "file_10.pdf",
    controlDok: "Controlled Copy",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    createdBy: "User10",
    createdDate: "2022-11-30 00:00:00",
    modifiedBy: "User7",
    modifiedDate: "2020-10-16 00:00:00",
    dok_nodok: "ND-9497",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 11,
    men_id: 8,
    namaKdo: "Document Title 11",
    dok_tgl_unduh: "2020-06-26 00:00:00",
    dok_tgl_akhir: "2021-09-04",
    dok_file: "file_11.pdf",
    controlDok: "Control-76",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    createdBy: "User11",
    createdDate: "2023-03-20 00:00:00",
    modifiedBy: "User11",
    modifiedDate: "2021-07-31 00:00:00",
    dok_nodok: "ND-9098",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 12,
    men_id: 2,
    namaKdo: "Document Title 12",
    dok_tgl_unduh: "2024-03-21 00:00:00",
    dok_tgl_akhir: "2024-09-01",
    dok_file: "file_12.pdf",
    controlDok: "Control-93",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    createdBy: "User12",
    createdDate: "2021-08-31 00:00:00",
    modifiedBy: "User11",
    modifiedDate: "2023-01-23 00:00:00",
    dok_nodok: "ND-8610",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 13,
    men_id: 5,
    namaKdo: "Document Title 13",
    dok_tgl_unduh: "2023-11-25 00:00:00",
    dok_tgl_akhir: "2020-09-05",
    dok_file: "file_13.pdf",
    controlDok: "Control-2",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    createdBy: "User13",
    createdDate: "2024-09-10 00:00:00",
    modifiedBy: "User3",
    modifiedDate: "2022-05-10 00:00:00",
    dok_nodok: "ND-6897",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 14,
    men_id: 9,
    namaKdo: "Document Title 14",
    dok_tgl_unduh: "2021-08-10 00:00:00",
    dok_tgl_akhir: "2024-12-01",
    dok_file: "file_14.pdf",
    controlDok: "Control-6",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    createdBy: "User14",
    createdDate: "2021-09-06 00:00:00",
    modifiedBy: "User14",
    modifiedDate: "2021-03-16 00:00:00",
    dok_nodok: "ND-8112",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 15,
    men_id: 1,
    namaKdo: "Document Title 15",
    dok_tgl_unduh: "2022-07-09 00:00:00",
    dok_tgl_akhir: "2020-05-27",
    dok_file: "file_15.pdf",
    controlDok: "Control-82",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    createdBy: "User15",
    createdDate: "2024-07-17 00:00:00",
    modifiedBy: "User10",
    modifiedDate: "2021-03-05 00:00:00",
    dok_nodok: "ND-8379",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 16,
    men_id: 10,
    namaKdo: "Document Title 16",
    dok_tgl_unduh: "2023-03-18 00:00:00",
    dok_tgl_akhir: "2022-06-01",
    dok_file: "file_16.pdf",
    controlDok: "Control-69",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    createdBy: "User16",
    createdDate: "2024-12-08 00:00:00",
    modifiedBy: "User15",
    modifiedDate: "2022-03-03 00:00:00",
    dok_nodok: "ND-7708",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 17,
    men_id: 1,
    namaKdo: "Document Title 17",
    dok_tgl_unduh: "2023-03-18 00:00:00",
    dok_tgl_akhir: "2021-07-29",
    dok_file: "file_17.pdf",
    controlDok: "Control-40",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    createdBy: "User17",
    createdDate: "2020-01-18 00:00:00",
    modifiedBy: "User6",
    modifiedDate: "2022-02-14 00:00:00",
    dok_nodok: "ND-6145",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 18,
    men_id: 10,
    namaKdo: "Document Title 18",
    dok_tgl_unduh: "2023-08-20 00:00:00",
    dok_tgl_akhir: "2021-08-24",
    dok_file: "file_18.pdf",
    controlDok: "Control-42",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    createdBy: "User18",
    createdDate: "2023-10-25 00:00:00",
    modifiedBy: "User2",
    modifiedDate: "2023-11-03 00:00:00",
    dok_nodok: "ND-8516",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 19,
    men_id: 1,
    namaKdo: "Document Title 19",
    dok_tgl_unduh: "2022-05-29 00:00:00",
    dok_tgl_akhir: "2024-06-22",
    dok_file: "file_19.pdf",
    controlDok: "Control-48",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    createdBy: "User19",
    createdDate: "2020-12-01 00:00:00",
    modifiedBy: "User3",
    modifiedDate: "2021-07-26 00:00:00",
    dok_nodok: "ND-7810",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    idDok: 20,
    men_id: 9,
    namaKdo: "Document Title 20",
    dok_tgl_unduh: "2022-05-13 00:00:00",
    dok_tgl_akhir: "2023-06-18",
    dok_file: "file_20.pdf",
    controlDok: "Control-36",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    createdBy: "User20",
    createdDate: "2024-01-22 00:00:00",
    modifiedBy: "User19",
    modifiedDate: "2021-04-07 00:00:00",
    dok_nodok: "ND-3730",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
];

export default function Index({ onChangePage }) {
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [modalType, setModalType] = useState(""); // "add", "edit", "detail", "preview"
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [sortFilter, setSortFilter] = useState("[namaKdo] ASC");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Master" },
    { label: "Kategori Dokumen" },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const { jenis } = useParams();
  const ModalRef = useRef();
  const idData = useRef();
  const isMobile = useIsMobile();

  const title = "Kategori Dokumen";

  const arrData = [
    { Value: "[namaKdo] ASC", Text: "Judul Dokumen [↑]" },
    { Value: "[namaKdo] DESC", Text: "Judul Dokumen [↓]" },
  ];

  useEffect(() => {
    const fetchDokumen = async () => {
      setLoading(true);
      const result = await useFetch(
        `${API_LINK}/MasterKategoriDokumen/GetDataKategoriDokumen`,
        {},
        "POST"
      ).finally(() => setLoading(false));
      if (result === "ERROR" || result === null || result.length === 0) {
        setItems([]);
      } else {
        const kategoriArray = Object.values(result);
        setItems(kategoriArray);
      }
    };

    fetchDokumen();
  }, []);

  const filteredData = useMemo(() => {
    if (items.length == 0) return [];
    return items
      .filter((item) =>
        item.namaKdo.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }, [searchKeyword, items]);

  // Paginate Data
  const currentData = useMemo(() => {
    const start = (pageCurrent - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, pageCurrent, pageSize]);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setDetail(data);
    ModalRef.current?.open();
  };

  const handlePreview = (item) => {
    const selected = items.find((obj) => obj.idDok == item.Key);
    handleOpenModal("preview", selected);
  };

  const handleDetail = (item) => {
    const selected = items.find((obj) => obj.idKdo == item.Key);
    handleOpenModal("detail", selected);
  };

  const handleEdit = (item) => {
    onChangePage(item.Type === "Header" ? "edit" : "editChild", breadcrumbs, item.Key);
  };

  const handleDelete = (item) => {
    const selected = items.find((obj) => obj.idDok == item.Key);
    console.log(selected.namaKdo + " deleted");
  };

  const handleDownload = (item) => {
    const selected = items.find((obj) => obj.idDok == item.Key);
    console.log(selected.namaKdo + " downloaded");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="container">
          <h1 style={{ color: "#2654A1", margin: "0", fontWeight: "700" }}>
            {title}
          </h1>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className="mt-4">
            <Button
              iconName="add"
              classType="primary dropdown-toggle px-3 border-start"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              label="Tambah Data"
            />
            <div className="dropdown-menu">
              {["Kategori Header", "Kategori Child"].map((label, index) => (
                <Button
                  key={index}
                  type="button"
                  label={label}
                  width="100%"
                  boxShadow="0px 4px 6px rgba(0, 0, 0, 0)"
                  onClick={() => onChangePage(index === 0 ? "add" : "addChild", breadcrumbs)}
                  style={{
                    color: "#2654A1",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#2654A1";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#2654A1";
                  }}
                />
              ))}
            </div>
            <div className="row mt-3">
              <div className="col-lg-10">
                <SearchField onChange={setSearchKeyword} />
              </div>
              <div className="col-lg-2">
                <Filter>
                  <DropDown
                    arrData={arrData}
                    type="none"
                    label="Urut Berdasarkan"
                    defaultValue="[namaKdo] ASC"
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value)}
                  />
                </Filter>
              </div>
            </div>
          </div>

          <div className="table-container bg-white rounded">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <Table
                  arrHeader={["No", "Nama", "Path", "Type"]}
                  data={currentData.map((item, index) => ({
                    Key: item.idKdo,
                    No: (pageCurrent - 1) * pageSize + index + 1,
                    Nama: item.namaKdo,
                    Path: item.pathKdo,
                    Type: item.idMen == null ? "Child" : "Header"
                  }))}
                  actions={[
                    "Detail",
                    "Edit",
                    "Delete",
                  ]}
                  onEdit={handleEdit}
                  onDetail={handleDetail}
                  onDelete={handleDelete}
                />
                <Paging
                  pageSize={pageSize}
                  pageCurrent={pageCurrent}
                  totalData={filteredData.length}
                  navigation={setPageCurrent}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {modalType === "detail" && (
        <Modal
          ref={ModalRef}
          title="Detail Dokumen"
          size="medium"
          Button2={
            <Button
              classType="secondary"
              label="Tutup"
              onClick={() => ModalRef.current.close()}
            />
          }
        >
          <div className="p-5 mt-0 bg-white rounded shadow">
            {/* <HeaderText label="Detail Dokumen" /> */}
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <DetailData label="Nama Kategori Dokumen" isi={detail.namaKdo} />
                <DetailData label="Deskripsi Kategori Dokumen" isi={detail.deskripsiKdo} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Parent Kategori Dokumen" isi={detail.parentKdo} />
                <DetailData label="Urutan Kategori Dokumen" isi={detail.urutanKdo} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dibuat Oleh" isi={detail.createdByKdo} />
                <DetailData
                  label="Dibuat Tanggal"
                  isi={new Date(detail.createdDateKdo).toLocaleDateString(
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
                <DetailData label="Dimodifikasi Oleh" isi={detail.modifiedByKdo} />
                <DetailData
                  label="Dimodifikasi Tanggal"
                  isi={new Date(detail.modifiedDateKdo).toLocaleDateString(
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
  );
}
