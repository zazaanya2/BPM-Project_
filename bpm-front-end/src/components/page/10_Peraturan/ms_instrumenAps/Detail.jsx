import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageTitleNav from "../../../part/PageTitleNav";
import HeaderForm from "../../../part/HeaderText";
import DetailData from "../../../part/DetailData";
import { API_LINK } from "../../../util/Constants";
import { useIsMobile } from "../../../util/useIsMobile";

export default function Detail({ onChangePage }) {
  const isMobile = useIsMobile();
  const location = useLocation();

  const [formData, setFormData] = useState({
    dok_nodok: "",
    dok_judul: "",
    dok_tahun: "",
    dok_control: "",
    dok_thn_kadaluarsa: "",
  });
  const [error, setError] = useState(null);

  const title = "DETAIL DOKUMEN";
  const breadcrumbs = [
    { label: "Instrumen APS", href: "/peraturan/aps" },
    { label: "Instrumen APS" },
  ];

  useEffect(() => {
    const detailId = location.state.detailData;
    console.log("data yang diterima: ", detailId);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_LINK}/MasterPeraturan/GetDataDokumenById`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ param1: detailId }),
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

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs */}
          <div className={isMobile ? "m-0" : "m-3"}>
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("index")}
            />
          </div>
          {/* Main Content */}
          <div
            className={
              isMobile
                ? "shadow p-4 m-2 mt-0 bg-white rounded"
                : "shadow p-5 p-5 m-5 mt-0 bg-white rounded"
            }
          >
            <div className="container">
              <HeaderForm label="Formulir Dokumen" />
              {error && <p className="text-danger">{error}</p>}
              <div className="row">
                {/* Kolom Kiri */}
                <div className="col-lg-6 col-md-6">
                  <DetailData
                    label="Nomor Induk Dokumen"
                    isi={formData.dok_nodok}
                  />
                  <DetailData label="Judul Dokumen" isi={formData.dok_judul} />
                  <DetailData
                    label="Jenis Dokumen"
                    isi={formData.dok_control}
                  />
                  <DetailData label="Tahun Dokumen" isi={formData.dok_tahun} />
                  <DetailData
                    label="Tahun Kadaluarsa"
                    isi={formData.dok_thn_kadaluarsa}
                  />
                </div>

                {/* Kolom Kanan */}
                <div className="col-lg-6 col-md-6">
                  <DetailData
                    label="Dibuat Oleh"
                    isi={formData.dok_created_by}
                  />
                  <DetailData
                    label="Dibuat Tanggal"
                    isi={
                      formData.dok_created_date
                        ? new Date(
                            formData.dok_created_date
                          ).toLocaleDateString("en-CA")
                        : "-"
                    }
                  />
                  <DetailData
                    label="Dimodifikasi Oleh"
                    isi={formData.dok_modif_by ? formData.dok_modif_by : "-"}
                  />
                  <DetailData
                    label="Dimodifikasi Tanggal"
                    isi={
                      formData.dok_modif_date
                        ? new Date(formData.dok_modif_date).toLocaleDateString(
                            "en-CA"
                          )
                        : "-"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
