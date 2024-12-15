import React, { useState, useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/TextField";
import HeaderForm from "../../../part/HeaderText";
import DropDown from "../../../part/Dropdown";
import Button from "../../../part/Button";
import FileUpload from "../../../part/FileUpload";
import { useLocation } from "react-router-dom";
import { API_LINK } from "../../../util/Constants";
import { useIsMobile } from "../../../util/useIsMobile";

export default function Edit({ onChangePage, data }) {
  const isMobile = useIsMobile();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);
  const location = useLocation();

  // Ambil idData dari state
  const editId = location.state?.idData || 10;

  const fetchData = async () => {
    try {
      const parameters = { param1: editId };

      for (let i = 2; i <= 50; i++) {
        parameters[`param${i}`] = null;
      }

      const response = await fetch(
        `${API_LINK}/MasterPeraturan/GetDataDokumenById`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parameters),
        }
      );

      if (!response.ok) throw new Error("Gagal mengambil data");

      const result = await response.json();
      setFormData(result[0] || {});
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (files) => {
    setFileData(files);
  };

  const handleSubmit = async () => {
    try {
      const {
        dok_nodok,
        dok_judul,
        dok_tahun,
        dok_control,
        dok_thn_kadaluarsa,
      } = formData;

      if (!dok_nodok || !dok_judul || !dok_tahun || !dok_control) {
        alert("Harap lengkapi semua field yang diperlukan.");
        return;
      }

      const uploadFormData = new FormData();
      Array.from(fileData).forEach((file) =>
        uploadFormData.append("file", file)
      );

      const uploadResponse = await fetch(
        `${API_LINK}/MasterPeraturan/UploadFiles`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!uploadResponse.ok) {
        const errorResponse = await uploadResponse.json();
        alert(errorResponse.message || "Gagal mengunggah dokumen");
        return;
      }

      const uploadData = await uploadResponse.json();
      const dok_fileList = uploadData.fileName;

      const dokumenData = {
        dok_category: "2",
        dok_nodok,
        dok_judul,
        dok_tahun: parseInt(dok_tahun),
        dok_control,
        dok_thn_kadaluarsa: dok_thn_kadaluarsa || null,
        dok_fileList,
        dok_status: 1,
        dok_modify_by: "Retno Widiastuti",
      };

      const createResponse = await fetch(
        `${API_LINK}/MasterPeraturan/EditDokumen`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dokumenData),
        }
      );

      if (!createResponse.ok) {
        const errorResponse = await createResponse.json();
        alert(errorResponse.message || "Gagal menyimpan data.");
        return;
      }

      alert("Berhasil! Data berhasil disimpan.");
      onChangePage("index");
    } catch (error) {
      alert(`Gagal! Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <PageTitleNav
            title="Edit Peraturan"
            breadcrumbs={[
              { label: "Peraturan", href: "/peraturan/kebijakan" },
              {
                label: "Kebijakan Peraturan",
                href: "/peraturan/kebijakan/kelola",
              },
              { label: "Edit Kebijakan Peraturan" },
            ]}
            onClick={() => onChangePage("index")}
          />

          <div
            className={
              isMobile
                ? "shadow p-4 m-2 bg-white rounded"
                : "shadow p-5 m-5 bg-white rounded"
            }
          >
            <HeaderForm label="Formulir Kebijakan Peraturan" />

            <TextField
              label="Nomor Induk Dokumen"
              isRequired
              name="Nomor Induk Dokumen"
              value={formData.dok_nodok || ""}
              onChange={(e) => handleInputChange("dok_nodok", e.target.value)}
            />

            <TextField
              label="Judul Dokumen"
              isRequired
              name="Judul Dokumen"
              value={formData.dok_judul || ""}
              onChange={(e) => handleInputChange("dok_judul", e.target.value)}
            />

            <TextField
              label="Tahun Dokumen"
              isRequired
              name="Tahun Dokumen"
              value={formData.dok_tahun || ""}
              onChange={(e) => handleInputChange("dok_tahun", e.target.value)}
            />

            <DropDown
              label="Jenis Dokumen"
              isRequired
              name="Jenis Dokumen"
              value={formData.dok_control || ""}
              onChange={(e) => handleInputChange("dok_control", e.target.value)}
              arrData={[
                { Value: "controlled", Text: "Controlled Copy" },
                { Value: "uncontrolled", Text: "Uncontrolled Copy" },
              ]}
            />

            <TextField
              label="Tahun Kadaluarsa"
              name="Tahun Kadaluarsa"
              value={formData.dok_thn_kadaluarsa || ""}
              onChange={(e) =>
                handleInputChange("dok_thn_kadaluarsa", e.target.value)
              }
            />

            <FileUpload
              label="Dokumen"
              isRequired
              name="Dokumen"
              onChange={(e) => handleFileChange(e.target.files)}
            />

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button
                classType="primary"
                type="button"
                label="Simpan"
                onClick={handleSubmit}
                width="100%"
              />
              <Button
                classType="danger"
                type="button"
                label="Batal"
                onClick={() => onChangePage("index")}
                width="100%"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
