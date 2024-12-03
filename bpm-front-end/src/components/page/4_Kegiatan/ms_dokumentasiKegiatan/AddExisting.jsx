import React, { useState, useRef, useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import DetailData from "../../../part/DetailData";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import Loading from "../../../part/Loading";
import DropDown from "../../../part/Dropdown";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");
import { API_LINK } from "../../../util/Constants";
import { useIsMobile } from "../../../util/useIsMobile";

export default function AddExisting({ onChangePage }) {
  const title = "Tambah Jadwal Kegiatan";
  const breadcrumbs = [
    { label: "Jadwal Kegiatan", href: "/kegiatan/jadwal" },
    { label: "Kelola Jadwal Kegiatan", href: "/kegiatan/jadwal/kelola" },
    { label: "Tambah Jadwal Kegiatan" },
  ];
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    place: "",
    jenisKegiatan: "",
  });

  const [existingKegiatan, setExistingKegiatan] = useState([]);

  // Fetch kegiatan data
  useEffect(() => {
    const fetchExistingKegiatan = async () => {
      try {
        const response = await fetch(
          `${API_LINK}/MasterKegiatan/GetDataKegiatanByCategory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ keg_kategori: 2 }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((item) => ({
            Value: item.keg_id, // ID untuk dropdown
            Text: item.keg_nama, // Nama untuk ditampilkan di dropdown
            keg_deskripsi: item.keg_deskripsi,
            keg_tgl_mulai: item.keg_tgl_mulai,
            keg_tgl_selesai: item.keg_tgl_selesai,
            keg_jam_mulai: item.keg_jam_mulai,
            keg_jam_selesai: item.keg_jam_selesai,
            keg_tempat: item.keg_tempat,
            jkg_nama: item.jkg_nama,
            jgk_id: item.jkg_id,
          }));
          setExistingKegiatan(formattedData);
          setLoading(false);
        } else {
          throw new Error("Gagal mengambil data kegiatan");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExistingKegiatan();
  }, []);

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    const selectedData = existingKegiatan.find(
      (item) => item.Value === Number(selectedId)
    );

    if (selectedData) {
      setFormData({
        id: selectedData.Value,
        name: selectedData.Text,
        description: selectedData.keg_deskripsi,
        startDate: moment(selectedData.keg_tgl_mulai).format(
          "dddd, DD MMMM YYYY"
        ), // Format tanggal
        endDate: moment(selectedData.keg_tgl_selesai).format(
          "dddd, DD MMMM YYYY"
        ),
        startTime: moment(selectedData.keg_jam_mulai, "HH:mm:ss").format(
          "HH:mm"
        ), // Format waktu
        endTime: moment(selectedData.keg_jam_selesai, "HH:mm:ss").format(
          "HH:mm [WIB]"
        ),
        place: selectedData.keg_tempat,
        jenisKegiatan: selectedData.jkg_nama,
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className={isMobile ? "m-0" : "m-3"}>
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("read")}
            />
          </div>
          <div
            className={
              isMobile
                ? "shadow p-4 m-2 mt-0 bg-white rounded"
                : "shadow p-5 m-5 mt-0 bg-white rounded"
            }
          >
            <HeaderForm label="Formulir Jadwal Kegiatan" />
            <div className="row">
              {/* Dropdown */}
              <DropDown
                arrData={existingKegiatan}
                type="pilih"
                label="Jadwal Kegiatan"
                value={formData.id}
                onChange={handleDropdownChange}
                isRequired={true}
              />
              {/* Details */}
              <div className="col-lg-6 col-md-6">
                <DetailData
                  label="Jenis Kegiatan"
                  isi={formData.jenisKegiatan}
                />
                <DetailData label="Tanggal Mulai" isi={formData.startDate} />
                <DetailData label="Waktu Mulai" isi={formData.startTime} />
              </div>
              <div className="col-lg-6 col-md-6">
                <DetailData label="Tempat" isi={formData.place} />
                <DetailData label="Tanggal Selesai" isi={formData.endDate} />
                <DetailData label="Waktu Selesai" isi={formData.endTime} />
              </div>
            </div>
            <DetailData label="Deskripsi Singkat" isi={formData.description} />
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="button"
                  label="Simpan"
                  width="100%"
                  onClick={() => {}}
                />
              </div>
              <div className="flex-grow-1 m-2">
                <Button
                  classType="danger"
                  type="button"
                  label="Batal"
                  width="100%"
                  onClick={() => onChangePage("read")}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
