import React, { useState, useEffect } from "react";
import SweetAlert from "../../../util/SweetAlert";
import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/InputField";
import HeaderForm from "../../../part/HeaderText";
import DropDown from "../../../part/Dropdown";
import Button from "../../../part/Button";
import { useLocation } from "react-router-dom";
import { API_LINK } from "../../../util/Constants";
import { useIsMobile } from "../../../util/useIsMobile";

export default function Edit({ onChangePage }) {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    dok_nodok: "",
    dok_judul: "",
    dok_tahun: "",
    dok_control: "",
    dok_thn_kadaluarsa: "",
  });
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const editId = location.state.editData;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_LINK}/MasterPeraturan/GetDataDokumenById`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ param1: editId }),
          }
        );

        if (!response.ok) throw new Error("Gagal mengambil data");
        const result = await response.json();
        setFormData(result[0] || {});
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [location.state]);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const {
        dok_id,
        dok_nodok,
        dok_judul,
        dok_tahun: dok_tahun_input,
        dok_control,
        dok_thn_kadaluarsa: dok_thn_kadaluarsa_input,
      } = formData;

      // VALIDASI: Pastikan semua field diisi
      if (!dok_nodok || !dok_judul || !dok_tahun_input || !dok_control) {
        SweetAlert(
          "Peringatan!",
          "Harap lengkapi semua field yang diperlukan.",
          "warning",
          "OK"
        );
        return;
      }

      // VALIDASI: Tahun Dokumen harus berupa angka
      if (!/^\d+$/.test(dok_tahun_input)) {
        SweetAlert(
          "Peringatan!",
          "Tahun Dokumen harus berupa angka integer.",
          "warning",
          "OK"
        );
        return;
      }

      const dok_tahun = parseInt(dok_tahun_input, 10);

      // VALIDASI: Tahun Kadaluarsa lebih besar dari Tahun Dokumen
      let dok_thn_kadaluarsa = null;
      if (dok_thn_kadaluarsa_input) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dok_thn_kadaluarsa_input)) {
          SweetAlert(
            "Peringatan!",
            "Format Tahun Kadaluarsa harus 'YYYY-MM-DD'.",
            "warning",
            "OK"
          );
          return;
        }

        const kadaluarsaYear = parseInt(
          dok_thn_kadaluarsa_input.split("-")[0],
          10
        );
        if (kadaluarsaYear <= dok_tahun) {
          SweetAlert(
            "Peringatan!",
            "Tahun Kadaluarsa harus lebih besar dari Tahun Dokumen.",
            "warning",
            "OK"
          );
          return;
        }

        dok_thn_kadaluarsa = dok_thn_kadaluarsa_input;
      }

      // DATA SIAP UNTUK DIKIRIM
      const dokumenData = {
        dok_id,
        dok_category: "2",
        dok_nodok,
        dok_judul,
        dok_tahun,
        dok_control,
        dok_thn_kadaluarsa,
        dok_modif_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        dok_modif_by: "Retno Widiastuti",
      };

      console.log("Dokumen data yang akan dikirimkan ke API:", dokumenData);

      // SIMPAN DATA KE API
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
        SweetAlert(
          "Gagal!",
          errorResponse.message || "Gagal menyimpan data.",
          "error",
          "OK"
        );
        return;
      }

      // TAMBAH SweetAlert UNTUK BERHASIL
      SweetAlert("Berhasil!", "Data berhasil disimpan.", "success", "OK").then(
        () => onChangePage("index")
      );
    } catch (error) {
      SweetAlert(
        "Gagal!",
        `Terjadi kesalahan: ${error.message}`,
        "error",
        "OK"
      );
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
              name="dok_nodok"
              value={formData.dok_nodok || ""}
              onChange={(e) => handleInputChange("dok_nodok", e.target.value)}
              disabled
            />

            <TextField
              label="Judul Dokumen"
              isRequired
              name="dok_judul"
              value={formData.dok_judul || ""}
              onChange={(e) => handleInputChange("dok_judul", e.target.value)}
            />

            <TextField
              label="Tahun Dokumen"
              isRequired
              name="dok_tahun"
              value={formData.dok_tahun || ""}
              onChange={(e) => handleInputChange("dok_tahun", e.target.value)}
            />

            <DropDown
              label="Jenis Dokumen"
              isRequired
              name="dok_control"
              value={formData.dok_control || ""}
              onChange={(e) => handleInputChange("dok_control", e.target.value)}
              arrData={[
                { Value: "controlled", Text: "Controlled Copy" },
                { Value: "uncontrolled", Text: "Uncontrolled Copy" },
              ]}
              disabled
            />

            <TextField
              label="Tahun Kadaluarsa"
              name="dok_thn_kadaluarsa"
              value={formData.dok_thn_kadaluarsa || ""}
              onChange={(e) =>
                handleInputChange("dok_thn_kadaluarsa", e.target.value)
              }
              type="date"
            />

            <div className="d-flex justify-content-between mt-4">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="button"
                  label="Simpan"
                  onClick={handleSubmit}
                  width="100%"
                />
              </div>
              <div className="flex-grow-1 m-2">
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
        </div>
      </main>
    </div>
  );
}

