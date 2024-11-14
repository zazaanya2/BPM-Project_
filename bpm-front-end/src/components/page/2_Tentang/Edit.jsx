import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTitleNav from "../../part/PageTitleNav";
import TextField from "../../part/TextField";
import TextArea from "../../part/TextArea";
import HeaderForm from "../../part/HeaderText";
import Button from "../../part/Button";
import DetailData from "../../part/DetailData";

export default function Edit({ onChangePage }) {
  const location = useLocation();

  const data = [
    {
      Key: 1,
      Nama: "Tentang BPM",
      Email: "budi@example.com",
      Alamat: "Jakarta",
    },
    {
      Key: 2,
      Nama: "Sejarah BPM",
      Email: "ani@example.com",
      Alamat: "Bandung",
    },
    {
      Key: 3,
      Nama: "Sasaran BPM",
      Email: "cici@example.com",
      Alamat: "Surabaya",
    },
    {
      Key: 4,
      Nama: "Strategi BPM",
      Email: "dodi@example.com",
      Alamat: "Medan",
    },
    { Key: 5, Nama: "Visi", Email: "eka@example.com", Alamat: "Semarang" },
    { Key: 6, Nama: "Misi", Email: "feri@example.com", Alamat: "Malang" },
    {
      Key: 7,
      Nama: "Struktur BPM",
      Email: "gina@example.com",
      Alamat: "Yogyakarta",
    },
    { Key: 8, Nama: "SK Pendirian", Email: "hani@example.com", Alamat: "Solo" },
  ];

  const [formData, setFormData] = useState({
    Nama: "",
    Email: "",
    Alamat: "",
    Deskripsi: "",
  });

  // Fetch data matching `editData` ID from location.state
  useEffect(() => {
    if (location.state?.editData) {
      const editId = location.state.editData;
      const selectedData = data.find((item) => item.Key === editId);
      if (selectedData) {
        setFormData({
          Nama: selectedData.Nama,
          Email: selectedData.Email,
          Alamat: selectedData.Alamat,
          Deskripsi: selectedData.Deskripsi || "",
        });
      }
    }
  }, [location.state?.editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="m-3 mb-0">
            <PageTitleNav
              title="Edit Tentang"
              breadcrumbs={[
                { label: "Tentang", href: "/tentang" },
                { label: "Kelola Tentang", href: "/tentang/kelola" },
                { label: "Edit Tentang" },
              ]}
              onClick={() => onChangePage("read")}
            />
          </div>

          <div className="shadow p-5 m-5 mt-4 bg-white rounded">
            <HeaderForm label="Formulir Tentang" />
            <div className="row">
              <TextField
                label="Nama"
                isRequired={true}
                name="Nama"
                value={formData.Nama}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                isRequired={true}
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
              />
              <TextField
                label="Alamat"
                isRequired={true}
                name="Alamat"
                value={formData.Alamat}
                onChange={handleInputChange}
              />
              <DetailData label="Dibuat Oleh" isi="Retno Widiastuti" />
            </div>
            <TextArea
              label="Deskripsi"
              name="Deskripsi"
              value={formData.Deskripsi || ""}
              onChange={handleInputChange}
            />
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="submit"
                  label="Simpan"
                  width="100%"
                  onClick={() => {
                    onChangePage("read");
                  }}
                />
              </div>
              <div className="flex-grow-1 m-2">
                <Button
                  classType="danger"
                  type="button"
                  label="Batal"
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
