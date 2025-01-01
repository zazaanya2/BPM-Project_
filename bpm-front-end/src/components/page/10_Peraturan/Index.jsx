import React, { useEffect, useState } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";
import Button from "../../part/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../part/Loading";

// Dynamically set title and breadcrumbs based on idMenu
let title = "Hallo";
let breadcrumbs = [];

export default function Read({ onChangePage }) {
  const [pageSize] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const idMenu = location.state?.idMenu;
  const [pageCurrent, setPageCurrent] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state

  // Menambahkan data menjadi 10 item dengan URL gambar
  const data = [
    { Key: 1, JudulDokumen: "INSTRUMEN APS A" },
    { Key: 2, JudulDokumen: "INSTRUMEN APS B" },
    { Key: 3, JudulDokumen: "INSTRUMEN APS C" },
    { Key: 4, JudulDokumen: "INSTRUMEN APS D" },
    { Key: 5, JudulDokumen: "INSTRUMEN APS E" },
  ];

  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  useEffect(() => {
    if (idMenu === 39) {
      title = "Dokumen Peraturan";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/kebijakan" },
        { label: "Dokumen Kebijakan Peraturan" },
      ];
    } else if (idMenu === 40) {
      title = "Dokumen Peraturan Eksternal";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/eksternal" },
        { label: "Dokumen Kebijakan Eksternal" },
      ];
    } else if (idMenu === 41) {
      title = "Instrumen APS";
      breadcrumbs = [
        { label: "Instrumen APS", href: "/peraturan/aps" },
        { label: "Dokumen Instrumen APS" },
      ];
    }

    // Set loading to false once idMenu is determined
    setLoading(false);
  }, [idMenu]);

  const handleEdit = (item) => {
    onChangePage("edit", { editData: item });
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
          <div className="p-3 m-5 mt-2 mb-0" style={{ marginLeft: "50px" }}>
            <Button
              iconName="add"
              classType="primary"
              label="Tambah Data"
              onClick={() => onChangePage("add", { idMenu: idMenu })}
            />
          </div>
          <div className="table-container bg-white p-3 m-5 mt-0 rounded">
            <Table
              arrHeader={["No", "Judul Dokumen"]}
              headerToDataMap={{
                No: "No",
                "Judul Dokumen": "JudulDokumen",
              }}
              data={currentData.map((item, index) => ({
                key: item.Key || index,
                No: indexOfFirstData + index + 1,
                JudulDokumen: item.JudulDokumen,
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
