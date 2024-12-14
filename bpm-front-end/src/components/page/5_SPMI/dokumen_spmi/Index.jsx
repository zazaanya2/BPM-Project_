import React, { useState, useRef, useEffect } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import SearchField from "../../../part/SearchField";
import Button from "../../../part/Button";
import Filter from "../../../part/Filter";
import Modal from "../../../part/Modal";
import HeaderText from "../../../part/HeaderText";
import DetailData from "../../../part/DetailData";
import { SyncLoader } from "react-spinners";
import { useIsMobile } from "../../../util/useIsMobile";
import Breadcrumbs from "../../../part/Breadcrumbs";

const data = [
  {
    dok_id: 1,
    men_id: 5,
    dok_judul: "Document Title 1",
    dok_tgl_unduh: "2024-04-30 00:00:00",
    dok_tgl_akhir: "2020-03-28",
    dok_file: "file_1.pdf",
    dok_control: "Control-47",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User1",
    dok_created_date: "2020-09-07 00:00:00",
    dok_modif_by: "User17",
    dok_modif_date: "2023-01-15 00:00:00",
    dok_nodok: "ND-9508",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 2,
    men_id: 8,
    dok_judul: "Document Title 2",
    dok_tgl_unduh: "2024-06-12 00:00:00",
    dok_tgl_akhir: "2020-01-11",
    dok_file: "file_2.pdf",
    dok_control: "Control-57",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User2",
    dok_created_date: "2024-06-26 00:00:00",
    dok_modif_by: "User5",
    dok_modif_date: "2022-09-08 00:00:00",
    dok_nodok: "ND-2559",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 3,
    men_id: 3,
    dok_judul: "Document Title 3",
    dok_tgl_unduh: "2024-07-06 00:00:00",
    dok_tgl_akhir: "2022-11-03",
    dok_file: "file_3.pdf",
    dok_control: "Control-81",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    dok_created_by: "User3",
    dok_created_date: "2022-11-20 00:00:00",
    dok_modif_by: "User14",
    dok_modif_date: "2020-05-04 00:00:00",
    dok_nodok: "ND-3505",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 4,
    men_id: 3,
    dok_judul: "Document Title 4",
    dok_tgl_unduh: "2023-07-28 00:00:00",
    dok_tgl_akhir: "2022-10-20",
    dok_file: "file_4.pdf",
    dok_control: "Control-64",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User4",
    dok_created_date: "2024-06-19 00:00:00",
    dok_modif_by: "User10",
    dok_modif_date: "2020-06-11 00:00:00",
    dok_nodok: "ND-7816",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 5,
    men_id: 7,
    dok_judul: "Document Title 5",
    dok_tgl_unduh: "2020-12-04 00:00:00",
    dok_tgl_akhir: "2022-08-10",
    dok_file: "file_5.pdf",
    dok_control: "Control-40",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User5",
    dok_created_date: "2020-08-19 00:00:00",
    dok_modif_by: "User12",
    dok_modif_date: "2022-09-28 00:00:00",
    dok_nodok: "ND-1909",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 5,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 6,
    men_id: 3,
    dok_judul: "Document Title 6",
    dok_tgl_unduh: "2022-10-15 00:00:00",
    dok_tgl_akhir: "2020-06-26",
    dok_file: "file_6.pdf",
    dok_control: "Control-9",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User6",
    dok_created_date: "2020-09-26 00:00:00",
    dok_modif_by: "User20",
    dok_modif_date: "2024-03-04 00:00:00",
    dok_nodok: "ND-7545",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 7,
    men_id: 7,
    dok_judul: "Document Title 7",
    dok_tgl_unduh: "2023-12-23 00:00:00",
    dok_tgl_akhir: "2020-10-21",
    dok_file: "file_7.pdf",
    dok_control: "Control-59",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User7",
    dok_created_date: "2021-04-07 00:00:00",
    dok_modif_by: "User20",
    dok_modif_date: "2023-01-14 00:00:00",
    dok_nodok: "ND-2803",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 8,
    men_id: 9,
    dok_judul: "Document Title 8",
    dok_tgl_unduh: "2023-10-21 00:00:00",
    dok_tgl_akhir: "2020-10-16",
    dok_file: "file_8.pdf",
    dok_control: "Control-25",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User8",
    dok_created_date: "2022-01-14 00:00:00",
    dok_modif_by: "User17",
    dok_modif_date: "2021-01-07 00:00:00",
    dok_nodok: "ND-9183",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 9,
    men_id: 3,
    dok_judul: "Document Title 9",
    dok_tgl_unduh: "2023-06-16 00:00:00",
    dok_tgl_akhir: "2024-01-17",
    dok_file: "file_9.pdf",
    dok_control: "Controlled Copy",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    dok_created_by: "User9",
    dok_created_date: "2023-10-20 00:00:00",
    dok_modif_by: "User10",
    dok_modif_date: "2024-08-05 00:00:00",
    dok_nodok: "ND-9283",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 10,
    men_id: 8,
    dok_judul: "Document Title 10",
    dok_tgl_unduh: "2023-05-06 00:00:00",
    dok_tgl_akhir: "2024-01-26",
    dok_file: "file_10.pdf",
    dok_control: "Controlled Copy",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    dok_created_by: "User10",
    dok_created_date: "2022-11-30 00:00:00",
    dok_modif_by: "User7",
    dok_modif_date: "2020-10-16 00:00:00",
    dok_nodok: "ND-9497",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 11,
    men_id: 8,
    dok_judul: "Document Title 11",
    dok_tgl_unduh: "2020-06-26 00:00:00",
    dok_tgl_akhir: "2021-09-04",
    dok_file: "file_11.pdf",
    dok_control: "Control-76",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    dok_created_by: "User11",
    dok_created_date: "2023-03-20 00:00:00",
    dok_modif_by: "User11",
    dok_modif_date: "2021-07-31 00:00:00",
    dok_nodok: "ND-9098",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 4,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 12,
    men_id: 2,
    dok_judul: "Document Title 12",
    dok_tgl_unduh: "2024-03-21 00:00:00",
    dok_tgl_akhir: "2024-09-01",
    dok_file: "file_12.pdf",
    dok_control: "Control-93",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    dok_created_by: "User12",
    dok_created_date: "2021-08-31 00:00:00",
    dok_modif_by: "User11",
    dok_modif_date: "2023-01-23 00:00:00",
    dok_nodok: "ND-8610",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 13,
    men_id: 5,
    dok_judul: "Document Title 13",
    dok_tgl_unduh: "2023-11-25 00:00:00",
    dok_tgl_akhir: "2020-09-05",
    dok_file: "file_13.pdf",
    dok_control: "Control-2",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    dok_created_by: "User13",
    dok_created_date: "2024-09-10 00:00:00",
    dok_modif_by: "User3",
    dok_modif_date: "2022-05-10 00:00:00",
    dok_nodok: "ND-6897",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 0,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 14,
    men_id: 9,
    dok_judul: "Document Title 14",
    dok_tgl_unduh: "2021-08-10 00:00:00",
    dok_tgl_akhir: "2024-12-01",
    dok_file: "file_14.pdf",
    dok_control: "Control-6",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    dok_created_by: "User14",
    dok_created_date: "2021-09-06 00:00:00",
    dok_modif_by: "User14",
    dok_modif_date: "2021-03-16 00:00:00",
    dok_nodok: "ND-8112",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 1,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 15,
    men_id: 1,
    dok_judul: "Document Title 15",
    dok_tgl_unduh: "2022-07-09 00:00:00",
    dok_tgl_akhir: "2020-05-27",
    dok_file: "file_15.pdf",
    dok_control: "Control-82",
    dok_status: "Active",
    dok_status_delete: "Deleted",
    dok_created_by: "User15",
    dok_created_date: "2024-07-17 00:00:00",
    dok_modif_by: "User10",
    dok_modif_date: "2021-03-05 00:00:00",
    dok_nodok: "ND-8379",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 16,
    men_id: 10,
    dok_judul: "Document Title 16",
    dok_tgl_unduh: "2023-03-18 00:00:00",
    dok_tgl_akhir: "2022-06-01",
    dok_file: "file_16.pdf",
    dok_control: "Control-69",
    dok_status: "Archived",
    dok_status_delete: "Deleted",
    dok_created_by: "User16",
    dok_created_date: "2024-12-08 00:00:00",
    dok_modif_by: "User15",
    dok_modif_date: "2022-03-03 00:00:00",
    dok_nodok: "ND-7708",
    dok_ref: 3,
    dok_ref_name: "Standar Lain",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 17,
    men_id: 1,
    dok_judul: "Document Title 17",
    dok_tgl_unduh: "2023-03-18 00:00:00",
    dok_tgl_akhir: "2021-07-29",
    dok_file: "file_17.pdf",
    dok_control: "Control-40",
    dok_status: "Archived",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User17",
    dok_created_date: "2020-01-18 00:00:00",
    dok_modif_by: "User6",
    dok_modif_date: "2022-02-14 00:00:00",
    dok_nodok: "ND-6145",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 18,
    men_id: 10,
    dok_judul: "Document Title 18",
    dok_tgl_unduh: "2023-08-20 00:00:00",
    dok_tgl_akhir: "2021-08-24",
    dok_file: "file_18.pdf",
    dok_control: "Control-42",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User18",
    dok_created_date: "2023-10-25 00:00:00",
    dok_modif_by: "User2",
    dok_modif_date: "2023-11-03 00:00:00",
    dok_nodok: "ND-8516",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 2,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 19,
    men_id: 1,
    dok_judul: "Document Title 19",
    dok_tgl_unduh: "2022-05-29 00:00:00",
    dok_tgl_akhir: "2024-06-22",
    dok_file: "file_19.pdf",
    dok_control: "Control-48",
    dok_status: "Inactive",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User19",
    dok_created_date: "2020-12-01 00:00:00",
    dok_modif_by: "User3",
    dok_modif_date: "2021-07-26 00:00:00",
    dok_nodok: "ND-7810",
    dok_ref: 2,
    dok_ref_name: "Standar Yang Ditetapkan Institusi",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
  {
    dok_id: 20,
    men_id: 9,
    dok_judul: "Document Title 20",
    dok_tgl_unduh: "2022-05-13 00:00:00",
    dok_tgl_akhir: "2023-06-18",
    dok_file: "file_20.pdf",
    dok_control: "Control-36",
    dok_status: "Active",
    dok_status_delete: "Not Deleted",
    dok_created_by: "User20",
    dok_created_date: "2024-01-22 00:00:00",
    dok_modif_by: "User19",
    dok_modif_date: "2021-04-07 00:00:00",
    dok_nodok: "ND-3730",
    dok_ref: 1,
    dok_ref_name: "Pengaturan Tentang Kebijakan SPMI",
    dok_rev: 3,
    dok_tahun: "2023-01-15 00:00:00",
  },
];
export default function Index({ onChangePage, title, breadcrumbs }) {
  const [pageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;

  const [filteredData, setFilteredData] = useState([]); // Data setelah difilter
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
  const ModalRef = useRef();
  const [modalType, setModalType] = useState(""); // "add", "edit", "detail"
  const [searchKeyword, setSearchKeyword] = useState(""); // Keyword pencarian
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let tempData = data;

    if (searchKeyword) {
      tempData = tempData.filter((item) =>
        item.dok_judul.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    const sorted = tempData.sort(
      (a, b) => a.dok_created_date - b.dok_created_date
    );

    setFilteredData(sorted);
  }, [data, searchKeyword]);

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setDetail(data);
    ModalRef.current.open();
  };

  const handlePreview = (item) => {
    const selected = data.find((obj) => obj.dok_id == item.Key);
    handleOpenModal("preview", selected);
  };
  
  const handleDetail = (item) => {
    const selected = data.find((obj) => obj.dok_id == item.Key);
    handleOpenModal("detail", selected);
  };

  const handleEdit = (item) => {
    onChangePage("edit", { state: { editData: item } });
  };

  const handleDelete = (item) => {
    const selected = data.find((obj) => obj.dok_id == item.Key);
    console.log(selected.dok_judul + " deleted");
  };

  const handleDownload = (item) => {
    const selected = data.find((obj) => obj.dok_id == item.Key);
    console.log(selected.dok_judul + " downloaded");
  };



  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="container mb-3">
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1
                  style={{ color: "#2654A1", margin: "0", fontWeight: "700" }}
                >
                  {title}
                </h1>
              </div>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div
              className="mt-5 mb-0"
            >
              <Button
                iconName="add"
                classType="primary"
                label="Tambah Akreditasi"
                // onClick={() => addModalRef.current.open()}
              />
              <div className="row mt-3 ">
                <div className="col-lg-10 col-md-6 ">
                  <SearchField onChange={(value) => setSearchKeyword(value)} />
                </div>
                <div className="col-lg-2 col-md-6">
                  <Filter />
                </div>
              </div>
            </div>
            <div className="table-container bg-white rounded">
              <Table
                arrHeader={["No", "Judul Dokumen"]}
                headerToDataMap={{
                  No: "No",
                  "Judul Dokumen": "JudulDokumen",
                }}
                data={currentData.map((item, index) => ({
                  Key: item.dok_id || index,
                  No: indexOfFirstData + index + 1,
                  JudulDokumen: item.dok_judul,
                }))}
                actions={[
                  "Preview",
                  "Detail",
                  "Edit",
                  "Print",
                  "Delete",
                  "PrintHistory",
                  "UpdateHistory",
                ]}
                onPreview={handlePreview}
                onEdit={handleEdit}
                onDetail={handleDetail}
                onPrint={handleDownload}
                onDelete={handleDelete}
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
            {/* <HeaderText label="Detail Dokumen" /> */}
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <DetailData label="Judul Dokumen" isi={detail.dok_judul} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Nomor Dokumen" isi={detail.dok_nodok} />
                <DetailData label="Jenis Dokumen" isi={detail.dok_control} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData
                  label="Tanggal Berlaku"
                  isi={new Date(detail.dok_tahun).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                />
                <DetailData
                  label="Tanggal Kadaluarsa"
                  isi={new Date(detail.dok_tgl_akhir).toLocaleDateString(
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
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dibuat Oleh" isi={detail.dok_created_by} />
                <DetailData
                  label="Dibuat Tanggal"
                  isi={new Date(detail.dok_created_date).toLocaleDateString(
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
                <DetailData
                  label="Dimodifikasi Oleh"
                  isi={detail.dok_modif_by}
                />
                <DetailData
                  label="Dimodifikasi Tanggal"
                  isi={new Date(detail.dok_modif_date).toLocaleDateString(
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
      {modalType === "preview" && (
        <Modal
          ref={ModalRef}
          title="Preview Dokumen"
          size="full"
          Button2={
            <Button
              classType="secondary"
              label="Tutup"
              onClick={() => ModalRef.current.close()}
            />
          }
        >
          <div className="p-3 mt-0 bg-white rounded shadow">
            <HeaderText label="Preview Dokumen" />
            <div style={{ width: "90vh", height: "50vh" }}>
              {isLoading == true ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    minHeight: "50vh",
                    margin: 0,
                  }}
                >
                  <SyncLoader color="#0d6efd" loading={true} />
                </div>
              ) : (
                <embed
                  src={pdf}
                  width="100%"
                  height="100%"
                  type="application/pdf"
                  title="PDF Preview"
                  onLoad={() => setIsLoading(false)}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
