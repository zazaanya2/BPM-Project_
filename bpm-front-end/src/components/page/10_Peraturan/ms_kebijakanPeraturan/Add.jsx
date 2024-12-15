import React, { useState, useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/TextField";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import Dropdown from "../../../part/Dropdown";
import FileUpload from "../../../part/FileUpload";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";
import DocUpload from "../../../part/DocUpload";

export default function Add({ onChangePage }) {
  const title = "KEBIJAKAN PERATURAN";
  const breadcrumbs = [
    { label: "Peraturan", href: "/peraturan/kebijakan" },
    { label: "Kebijakan Peraturan", href: "/peraturan/kebijakan" },
    { label: "Tambah Kebijakan Peraturan" },
  ];

  const isMobile = useIsMobile();
  const author = "Retno Widiastuti";

  //submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const dok_nodok = document.querySelector(
        "[name='Nomor Induk Dokumen']"
      ).value;
      const dok_judul = document.querySelector("[name='Judul Dokumen']").value;
      const dok_tahun = parseInt(
        document.querySelector("[name='Tahun Dokumen']").value
      );
      const dok_control = document.querySelector(
        "[name='Jenis Dokumen']"
      ).value;
      const dok_thn_kadaluarsa_input =
        document.querySelector("[name='Tahun Kadaluarsa']").value || null;

      let dok_thn_kadaluarsa = null;
      if (dok_thn_kadaluarsa_input) {
        dok_thn_kadaluarsa = dok_thn_kadaluarsa_input; // Pastikan format tahun yang benar
      }

      const dok_files = Array.from(
        document.querySelector("[name='Dokumen']").files
      );

      //TAMBAH INI
      if (!dok_nodok || !dok_judul || isNaN(dok_tahun) || !dok_control) {
        alert("Harap lengkapi semua field yang diperlukan.");
        return;
      }

      dok_files.forEach((file) => formData.append("file", file));

      // Kirim data ke backend untuk upload file
      const uploadResponse = await fetch(
        `${API_LINK}/MasterPeraturan/UploadFiles`,
        {
          method: "POST",
          body: formData, // Pastikan mengirim FormData
        }
      );

      if (!uploadResponse.ok) {
        const errorResponse = await uploadResponse.json();
        console.error("Upload Error:", errorResponse);
        alert(errorResponse.message || "Gagal mengunggah dokumen");
        return;
      }

      const uploadResponseData = await uploadResponse.json();

      // Periksa apakah file berhasil diunggah
      if (uploadResponseData && uploadResponseData.fileName) {
        const dok_fileList = uploadResponseData.fileName; // Mendapatkan nama file yang di-upload

        const dokumenData = {
          dok_category: "2", // Asumsi kategori tetap 1
          dok_nodok,
          dok_judul,
          dok_tahun,
          dok_control,
          dok_thn_kadaluarsa, // Tahun Kadaluarsa dalam format 'YYYY-MM-DD'
          dok_fileList, // Gunakan nama file yang diupload
          dok_status: 1,
          dok_created_by: "Retno Widiastuti", // Anda bisa mengganti ini dengan dynamic username jika perlu
        };

        // Kirim data dokumen ke API
        const createResponse = await fetch(
          `${API_LINK}/MasterPeraturan/CreateDokumen`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dokumenData),
          }
        );

        if (!createResponse.ok) {
          const errorResponse = await createResponse.json();
          console.error("CreatePeraturan Error:", errorResponse);
          alert(errorResponse.message || "Gagal menambahkan peraturan.");
          return;
        }

        alert("Berhasil! Data berhasil ditambahkan.");
        onChangePage("index");
      } else {
        alert("Gagal mengunggah file. Coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Gagal! Terjadi kesalahan saat menambahkan data.");
    }
  };

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
                ? "shadow p-4 m-2 mt-0 bg-white rounded"
                : "shadow p-5 m-5 mt-0 bg-white rounded"
            }
          >
            <HeaderForm label="Formulir Kebijakan Peraturan" />
            <div className="row">
              <TextField
                label="Nomor Induk Dokumen"
                name="Nomor Induk Dokumen"
                isRequired={true}
              />
            </div>
            <div className="row">
              <TextField
                label="Judul Dokumen"
                name="Judul Dokumen"
                isRequired={true}
              />
            </div>
            <div className="row">
              <TextField
                label="Tahun Dokumen"
                name="Tahun Dokumen"
                isRequired={true}
              />
            </div>
            <div className="row">
              <Dropdown
                label="Jenis Dokumen"
                name="Jenis Dokumen"
                isRequired={true}
                arrData={[
                  { Text: "Controlled Copy", Value: "controlled" },
                  { Text: "Uncontrolled Copy", Value: "uncontrolled" },
                ]}
              />
            </div>
            <div className="row">
              <TextField label="Tahun Kadaluarsa" name="Tahun Kadaluarsa" />
            </div>
            <div className="row">
              <DocUpload label="Dokumen" name="Dokumen" />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="submit"
                  label="Simpan"
                  width="100%"
                  onClick={handleSubmit}
                />
              </div>
              <div className="flex-grow-1 m-2">
                <Button
                  classType="danger"
                  type="button"
                  label="Batal"
                  width="100%"
                  onClick={() => onChangePage("index")}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
