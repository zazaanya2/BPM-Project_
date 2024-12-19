import React, { useEffect, useState } from "react";
import SweetAlert from "../../../util/SweetAlert";
import { API_LINK } from "../../../util/Constants";
import { useLocation } from "react-router-dom";
import Button from "../../../part/Button";

export default function Print() {
  const location = useLocation();
  const [dokumenData, setDokumenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDokumenById = async () => {
      const dokumenId = location.state?.editData;

      if (!dokumenId) {
        SweetAlert(
          "Peringatan!",
          "ID dokumen tidak ditemukan.",
          "warning",
          "OK"
        );
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_LINK}/MasterPeraturan/GetDataDokumenById`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ param1: dokumenId }),
          }
        );

        if (!response.ok) throw new Error("Gagal mengambil data dokumen.");
        const result = await response.json();

        setDokumenData(result[0] || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDokumenById();
  }, [location.state]);

  const handleUnduhDokumen = async () => {
    try {
      const dokumenId = location.state?.editData;

      if (!dokumenId) {
        SweetAlert(
          "Peringatan!",
          "ID dokumen tidak ditemukan untuk unduh.",
          "warning",
          "OK"
        );
        return;
      }

      const response = await fetch(`${API_LINK}/TrunduhDokumen/unduhDokumen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ param1: dokumenId }),
      });

      if (!response.ok) throw new Error("Gagal mengunduh dokumen.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Membuka file di tab baru
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
    } catch (error) {
      SweetAlert(
        "Gagal!",
        `Terjadi kesalahan saat mengunduh dokumen: ${error.message}`,
        "error",
        "OK"
      );
    }
  };

  if (loading) return <p>Memuat data dokumen...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        Terjadi kesalahan: <strong>{error}</strong>
      </p>
    );

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>Data Dokumen</h1>
      {dokumenData ? (
        <div className="shadow p-5 m-5 bg-white rounded">
          <p>
            <strong>Nomor Dokumen:</strong> {dokumenData.dok_nodok}
          </p>
          <p>
            <strong>Judul Dokumen:</strong> {dokumenData.dok_judul}
          </p>
          <p>
            <strong>Tahun Dokumen:</strong> {dokumenData.dok_tahun}
          </p>
          <p>
            <strong>Tahun Kadaluarsa:</strong>{" "}
            {dokumenData.dok_thn_kadaluarsa || "-"}
          </p>

          <div className="d-flex justify-content-center mt-4">
            <Button
              classType="primary"
              type="button"
              label="Unduh Dokumen"
              onClick={handleUnduhDokumen}
              width="50%"
            />
          </div>
        </div>
      ) : (
        <p>Tidak ada data dokumen yang ditemukan.</p>
      )}
    </div>
  );
}
