import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { da, id } from "date-fns/locale";
import PageTitleNav from "../../../part/PageTitleNav";
import HeaderForm from "../../../part/HeaderText";
import DetailData from "../../../part/DetailData";
import { API_LINK } from "../../../util/Constants";
import Loading from "../../../part/Loading";
import { useIsMobile } from "../../../util/useIsMobile";
import { useFetch } from "../../../util/useFetch";

export default function Detail({ onChangePage }) {
  const isMobile = useIsMobile();
  const location = useLocation();

  const [formData, setFormData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const title = "DETAIL DOKUMEN";
  const breadcrumbs = [
    { label: "Kebijakan Peraturan", href: "/peraturan/kebijakan" },
    { label: "Kebijakan Peraturan" },
  ];

  useEffect(() => {
    if (!location.state?.idData) return;

    const editId = location.state.idData;
    const fetchData = async () => {
      const parameters = { dok_id: 10 };
      for (let i = 2; i <= 50; i++) {
        parameters[`param${i}`] = null; // Isi semua parameter dengan null
      }
      try {
        const data = await fetch(
          `${API_LINK}/MasterPeraturan/GetDataDokumenById`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parameters),
          }
        );
        const response = await data.json();

        //   const foto = JSON.parse(data.foto);

        // Extract the image paths from foto
        //   const images = foto.map((fotoItem) => fotoItem.foto_path);

        setFormData(
          // NomorIndukDokumen: peraturan.dok_nodok,
          // JudulDokumen: peraturan.dok_judul,
          // JenisDokumen: peraturan.dok_control,
          // TahunDokumen: peraturan.dok_tahun,
          // TahunKadaluarsa: format(
          //   new Date(peraturan.dok_thn_kadaluarsa),
          //   "EEEE, dd MMMM yyyy",
          //   {
          //     locale: id,
          //   }
          // ),
          // Createby: peraturan.dok_created_by,
          // CreateDate: new Date(peraturan.dok_created_date).toLocaleDateString(
          //   "id-ID",
          //   {
          //     weekday: "long",
          //     day: "numeric",
          //     month: "long",
          //     year: "numeric",
          //   }
          // ),
          // Modifby: peraturan.dok_modif_by ? peraturan.dok_modif_by : "-",
          // ModifDate: peraturan.dok_modif_date
          //   ? new Date(peraturan.dok_modif_date).toLocaleDateString("id-ID", {
          //       weekday: "long",
          //       day: "numeric",
          //       month: "long",
          //       year: "numeric",
          //     })
          //   : "-",
          response[0]
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.idData]);

  if (loading) {
    return <Loading />;
  }

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
            <HeaderForm label="Formulir Dokumen" />
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DetailData
                  label="Nomor Induk Dokumen"
                  isi={formData.dok_nodok}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Judul Dokumen" isi={formData.JudulDokumen} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Jenis Dokumen" isi={formData.JenisDokumen} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Tahun Dokumen" isi={formData.TahunDokumen} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData
                  label="Tahun Kadaluarsa"
                  isi={formData.TahunKadaluarsa}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dibuat Oleh" isi={formData.Createby} />
                <DetailData label="Dibuat Tanggal" isi={formData.CreateDate} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Dimodifikasi Oleh" isi={formData.Modifby} />
                <DetailData
                  label="Dimodifikasi Tanggal"
                  isi={formData.ModifDate}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
