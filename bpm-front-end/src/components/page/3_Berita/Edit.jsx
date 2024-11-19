import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTitleNav from "../../part/PageTitleNav";
import TextField from "../../part/TextField";
import TextArea from "../../part/TextArea";
import DatePicker from "../../part/DatePicker";
import UploadFoto from "../../part/UploadFotoMulti";
import HeaderForm from "../../part/HeaderText";
import Button from "../../part/Button";
import DetailData from "../../part/DetailData";
import { useIsMobile } from "../../util/useIsMobile";
import { API_LINK, BERITAFOTO_LINK } from "../../util/Constants";
import { format } from "date-fns";

export default function Edit({ onChangePage }) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    author: "Retno Widiastuti",
    images: [], // Hanya akan menyimpan path gambar
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const title = "Edit Berita";
  const breadcrumbs = [
    { label: "Berita", href: "/berita" },
    { label: "Kelola Berita", href: "/berita/kelola" },
    { label: "Edit Berita" },
  ];

  console.log(location.state.idData);
  useEffect(() => {
    if (!location.state?.idData) return;

    const editId = location.state.idData;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_LINK}/api/MasterBerita/GetDataBeritaById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ber_id: editId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data API:", data);

        if (data?.berita?.length > 0) {
          const berita = data.berita[0];

          // Ambil hanya path gambar
          const images = data.foto?.map((foto) => `${BERITAFOTO_LINK}${foto.foto_path}`) || [];

          setFormData({
            title: berita.ber_judul,
            date: format(new Date(berita.ber_tgl), "yyyy-MM-dd"),
            description: berita.ber_isi,
            author: berita.ber_created_by,
            images: images,
          });
        } else {
          console.warn("Data tidak ditemukan atau kosong.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal mengambil data berita.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.idData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim:", formData);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs */}
          <div className={isMobile ? "m-0" : "m-3"}>
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("read")}
            />
          </div>
          {/* Main Content */}
          <div
            className={
              isMobile
                ? "shadow p-4 m-2 mt-0 bg-white rounded"
                : "shadow p-5 m-5 mt-0 bg-white rounded"
            }
          >
            <HeaderForm label="Formulir Berita" />
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <TextField
                    label="Judul Berita"
                    isRequired={true}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  <DetailData label="Penulis" isi={formData.author} />
                </div>
                <div className="col-lg-6 col-md-6">
                  <DatePicker
                    label="Tanggal"
                    value={formData.date}
                    onChange={(date) =>
                      setFormData({ ...formData, date: date })
                    }
                  />
                </div>
              </div>
              <TextArea
                label="Isi Berita"
                initialValue={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="row">
              <UploadFoto
                label="Masukkan Foto"
                initialImages={formData.images} // Contoh data awal: [{ type: "path", value: "url/to/image.jpg" }]
                onChange={(updatedImages) => setFormData({ ...formData, images: updatedImages })}
              />

              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  classType="primary"
                  type="submit"
                  label="Simpan"
                  width="100%"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
