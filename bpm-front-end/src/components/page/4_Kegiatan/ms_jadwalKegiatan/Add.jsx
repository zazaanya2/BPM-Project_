import React, { useState, useRef } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/TextField";
import TextArea from "../../../part/TextArea";
import DatePicker from "../../../part/DatePicker";
import TimePicker from "../../../part/TimePicker";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import { API_LINK } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";
import { useIsMobile } from "../../../util/useIsMobile";

export default function Add({ onChangePage }) {
  const title = "Tambah Jadwal Kegiatan";
  const breadcrumbs = [
    { label: "Jadwal Kegiatan", href: "/kegiatan/jadwal" },
    { label: "Kelola Jadwal Kegiatan", href: "/kegiatan/jadwal/kelola" },
    { label: "Tambah Jadwal Kegiatan" },
  ];
  const isMobile = useIsMobile();

  const [deskripsi, setDeskripsi] = useState("");

  // Refs for validation
  const namaRef = useRef();
  const deskripsiRef = useRef();
  const tempatRef = useRef();
  const tglMulaiRef = useRef();
  const jamMulaiRef = useRef();
  const tglSelesaiRef = useRef();
  const jamSelesaiRef = useRef();

  const handleSubmit = async () => {
    // Validation checks for required fields
    if (!namaRef.current?.validate()) {
      namaRef.current?.focus();
      return;
    }
    if (!deskripsiRef.current?.validate()) {
      deskripsiRef.current?.focus();
      return;
    }
    if (!tempatRef.current?.validate()) {
      tempatRef.current?.focus();
      return;
    }
    if (!tglMulaiRef.current?.validate()) {
      tglMulaiRef.current?.focus();
      return;
    }
    if (!jamMulaiRef.current?.validate()) {
      jamMulaiRef.current?.focus();
      return;
    }
    if (!tglSelesaiRef.current?.validate()) {
      tglSelesaiRef.current?.focus();
      return;
    }
    if (!jamSelesaiRef.current?.validate()) {
      jamSelesaiRef.current?.focus();
      return;
    }

    // Combine date and time values into Date objects
    const startDate = new Date(
      `${tglMulaiRef.current.value} ${jamMulaiRef.current.value}`
    );
    const endDate = new Date(
      `${tglSelesaiRef.current.value} ${jamSelesaiRef.current.value}`
    );

    // Validate that start date is less than end date
    if (startDate >= endDate) {
      SweetAlert(
        "Gagal!",
        "Tanggal dan waktu mulai harus lebih awal dari tanggal dan waktu selesai.",
        "error",
        "OK"
      );
      return;
    }

    const kegiatanData = {
      keg_nama: namaRef.current.value,
      keg_deskripsi: deskripsi,
      keg_tgl_mulai: tglMulaiRef.current.value,
      keg_jam_mulai: jamMulaiRef.current.value,
      keg_tgl_selesai: tglSelesaiRef.current.value,
      keg_jam_selesai: jamSelesaiRef.current.value,
      keg_tempat: tempatRef.current.value,
      keg_created_by: "Admin",
    };

    try {
      const response = await fetch(
        `${API_LINK}/MasterKegiatan/CreateJadwalKegiatan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(kegiatanData),
        }
      );

      if (response.ok) {
        SweetAlert(
          "Berhasil!",
          "Jadwal kegiatan berhasil dibuat.",
          "success",
          "OK"
        ).then(() => onChangePage("read"));
      } else {
        throw new Error("Gagal membuat jadwal kegiatan");
      }
    } catch (error) {
      SweetAlert("Gagal!", error.message, "error", "OK");
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
              <div className="col-lg-6 col-md-6">
                <TextField
                  ref={namaRef}
                  label="Nama Kegiatan"
                  isRequired={true}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <TextField ref={tempatRef} label="Tempat" isRequired={true} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <DatePicker
                  ref={tglMulaiRef}
                  label="Tanggal Mulai"
                  isRequired={true}
                />
                <TimePicker
                  ref={jamMulaiRef}
                  label="Waktu Mulai"
                  isRequired={true}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <DatePicker
                  ref={tglSelesaiRef}
                  label="Tanggal Selesai"
                  isRequired={true}
                />
                <TimePicker
                  ref={jamSelesaiRef}
                  label="Waktu Selesai"
                  isRequired={true}
                />
              </div>
            </div>
            <TextArea
              ref={deskripsiRef}
              label="Deskripsi Singkat"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              isRequired={true}
            />

            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="button"
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
