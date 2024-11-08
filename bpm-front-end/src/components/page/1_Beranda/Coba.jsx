import React, { useState } from "react"; 
import Table from "../../part/Table"; 
import Paging from "../../part/Paging"; 
import PageTitleNav from "../../part/PageTitleNav"; 
import TextField from "../../part/TextField"; 
import TextArea from "../../part/TextArea"; 
import DatePicker from "../../part/DatePicker"; 
import UploadFoto from "../../part/UploadFoto"; 
import HeaderForm from "../../part/HeaderForm"; 
import Button from "../../part/Button";
import DetailData from "../../part/DetailData"; 

function Coba() {
  const [pageSize] = useState(10); // Set the page size to 10
  const [pageCurrent, setPageCurrent] = useState(1); // Current page state

  // Data with 15 entries
  const data = [
    { Key: 1, Nama: "Budi", Email: "budi@example.com", Alamat: "Jakarta" },
    { Key: 2, Nama: "Ani", Email: "ani@example.com", Alamat: "Bandung" },
    { Key: 3, Nama: "Cici", Email: "cici@example.com", Alamat: "Surabaya" },
    { Key: 4, Nama: "Dodi", Email: "dodi@example.com", Alamat: "Medan" },
    { Key: 5, Nama: "Eka", Email: "eka@example.com", Alamat: "Semarang" },
    { Key: 6, Nama: "Feri", Email: "feri@example.com", Alamat: "Malang" },
    { Key: 7, Nama: "Gina", Email: "gina@example.com", Alamat: "Yogyakarta" },
    { Key: 8, Nama: "Hani", Email: "hani@example.com", Alamat: "Solo" },
    { Key: 9, Nama: "Iwan", Email: "iwan@example.com", Alamat: "Bogor" },
    { Key: 10, Nama: "Joko", Email: "joko@example.com", Alamat: "Bekasi" },
    { Key: 11, Nama: "Kiki", Email: "kiki@example.com", Alamat: "Tangerang" },
    { Key: 12, Nama: "Lina", Email: "lina@example.com", Alamat: "Palembang" },
    { Key: 13, Nama: "Mira", Email: "mira@example.com", Alamat: "Batam" },
    { Key: 14, Nama: "Nina", Email: "nina@example.com", Alamat: "Padang" },
    { Key: 15, Nama: "Odi", Email: "odi@example.com", Alamat: "Pekanbaru" },
  ];

  // Calculate data to display for the current page
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Function to handle page navigation
  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  const title = "Kebijakan Peraturan";
  const subtitle = "Formulir Peraturan";
  const breadcrumbs = [
    { label: "SPMI", href: "#" },
    { label: "Dokumen SPMI", href: "#" },
    { label: "Kebijakan SPMI" }
  ];

  return ( 
    <div className="d-flex flex-column min-vh-100">
     
      <main className="flex-grow-1" style={{ marginTop: '80px' }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
          <div className="m-3">
            <PageTitleNav 
              title="New Title"
              breadcrumbs={[{ label: "Home", href: "#" }, { label: "Section", href: "#" }, { label: "Current Page" }]}
              onClick={() => console.log("Icon clicked")}
            />
          </div>
          
          {/* Main Content Section */}
          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
          <SearchField></SearchField>
            <HeaderForm label="Formulir Sasmito"/>
            <div className="row">
              <div className="col-lg-6 col-md-6 ">
                <TextField label="Nama" isRequired="true" />
                <DetailData label="Dibuat Oleh" isi="Retno Widiastuti"/>
              </div>
              <div className="col-lg-6 col-md-6">
                <DatePicker label="Tanggal"/>
              </div>
            </div>
            
            <TextArea label="Deskripsi"/>

            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <UploadFoto label="Masukkan Foto"/>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <UploadFoto label="Masukkan Foto"/>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <UploadFoto label="Masukkan Foto"/>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 m-2">
                <Button classType="primary" type="submit" label="Simpan" width="100%" />
              </div>
              <div className="flex-grow-1 m-2">
                <Button classType="danger" type="button" label="Batal" width="100%" />
              </div>
            </div>

          </div>

          <div className="table-container bg-white p-4 m-4 rounded">
            <Table
              arrHeader={["Nama", "Email", "Alamat"]}
              data={currentData} // Pass currentData to Table
              actions={["Detail", "Edit", "Delete", "Print", "Final", "PrintHistory", "UpdateHistory", "Responden"]}
              onDelete={(id) => console.log("Delete", id)}
              onDetail={(id) => console.log("Detail", id)}
              onEdit={(id) => console.log("Edit", id)}
              onFinal={(id) => console.log("Final", id)}
              onPrint={(id) => console.log("Print", id)}
              onPrintHistory={(id) => console.log("Print History", id)}
              onUpdateHistory={(id) => console.log("Update History", id)}
              onResponden={(id) => console.log("Update Responden", id)}

            />

            {/* Paging Component */}
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

export default Coba;
