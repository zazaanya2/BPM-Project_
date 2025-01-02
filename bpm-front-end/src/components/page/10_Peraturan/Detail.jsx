import React, { useState, useEffect } from "react";
import PageTitleNav from "../../part/PageTitleNav";
import TextField from "../../part/TextField";
import HeaderForm from "../../part/HeaderText";
import DropDown from "../../part/Dropdown";
import { useLocation } from "react-router-dom";
import { PERATURAN_FILE_LINK } from "../../util/Constants";
import Button from "../../part/Button";
import Loading from "../../part/Loading";

// Dynamically set title and breadcrumbs based on idMenu
let title = "";
let titleHeader = "Formulir";
let breadcrumbs = [];

export default function Edit({ onChangePage, data }) {
  const location = useLocation();
  const idMenu = location.state?.idMenu;
  const [loading, setLoading] = useState(true); // New loading state

  const [formData, setFormData] = useState({
    JudulDokumen: "",
    NomorIndukDokumen: "",
    TahunDokumen: "",
    JenisDokumen: "",
    TahunKadaluarsa: "",
  });

  useEffect(() => {
    if (location.state?.editData) {
      const editId = location.state.editData;
      const selectedData = data.find((item) => item.Key === editId);
      if (selectedData) {
        setFormData({
          JudulDokumen: selectedData.JudulDokumen,
          NomorIndukDokumen: selectedData.NomorIndukDokumen,
          TahunDokumen: selectedData.TahunDokumen,
          JenisDokumen: selectedData.JenisDokumen,
          TahunKadaluarsa: selectedData.TahunKadaluarsa,
        });
      }
    }
  }, [location.state, data]);

  useEffect(() => {
    if (idMenu === 39) {
      title = "Edit Peraturan";
      titleHeader = "Formulir Kebijakan Peraturan";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/kebijakan" },
        {
          label: "Kebijakan Peraturan",
          href: "/peraturan/kebijakan/kelola",
        },
        { label: "Edit Kebijakan Peraturan" },
      ];
    } else if (idMenu === 40) {
      title = "Edit Peraturan Eksternal";
      titleHeader = "Formulir Peraturan Eksternal";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/eksternal" },
        {
          label: "Peraturan Eksternal",
          href: "/peraturan/eksternal/kelola",
        },
        { label: "Edit Peraturan Eksternal" },
      ];
    } else if (idMenu === 41) {
      title = "Edit Instrumen APS";
      titleHeader = "Formulir Instrumen APS";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/aps" },
        {
          label: "instrumen APS",
          href: "/peraturan/aps/kelola",
        },
        { label: "Edit Instrumen APS" },
      ];
    }

    // Set loading to false once idMenu is determined
    setLoading(false);
  }, [idMenu]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (loading) return <Loading />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="m-3 mb-0">
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("index")}
            />
          </div>

          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
            <HeaderForm label={titleHeader} />
            <div className="row">
              <TextField
                label="Judul Dokumen"
                isRequired={true}
                name="Judul Dokumen"
                value={formData.JudulDokumen}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <TextField
                  label="Nomor Induk Dokumen"
                  isRequired={true}
                  name="Nomor Induk Dokumen"
                  value={formData.NomorIndukDokumen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <TextField
                  label="Tahun Dokumen"
                  isRequired={true}
                  name="Tahun Dokumen"
                  value={formData.TahunDokumen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <DropDown
                  label="Jenis Dokumen"
                  isRequired={true}
                  name="Jenis Dokumen"
                  value={formData.JenisDokumen}
                  onChange={handleInputChange}
                  arrData={[
                    { Value: "controlled", Text: "Controlled Copy" },
                    { Value: "uncontrolled", Text: "Uncontrolled Copy" },
                  ]}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <TextField
                  label="Tahun Kadaluarsa"
                  isRequired={true}
                  name="Tahun Kadaluarsa"
                  value={formData.TahunKadaluarsa}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="flex-grow-1 m-2">
                <Button
                  classType="primary"
                  type="submit"
                  label="Simpan"
                  width="100%"
                  onClick={() => {
                    onChangePage("index");
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
