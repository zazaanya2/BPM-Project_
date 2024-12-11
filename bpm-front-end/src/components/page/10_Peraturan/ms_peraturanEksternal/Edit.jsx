import React, { useState, useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/TextField";
import HeaderForm from "../../../part/HeaderText";
import DropDown from "../../../part/Dropdown";
import { useLocation } from "react-router-dom";
import Button from "../../../part/Button";
import FileUpload from "../../../part/FileUpload";

import { useIsMobile } from "../../../util/useIsMobile";

export default function Edit({ onChangePage, data }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    JudulDokumen: "",
    NomorIndukDokumen: "",
    TahunDokumen: "",
    JenisDokumen: "",
    TahunKadaluarsa: "",
    Dokumen: "",
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
          Dokumen: selectedData.Dokumen,
        });
      }
    }
  }, [location.state, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className={isMobile ? "m-0" : "m-3"}>
            <PageTitleNav
              title="Edit Peraturan"
              breadcrumbs={[
                { label: "Peraturan", href: "/peraturan/eksternal" },
                {
                  label: "Peraturan Eksternal",
                  href: "/peraturan/eksternal/kelola",
                },
                { label: "Edit Peraturan Eksternal" },
              ]}
              onClick={() => onChangePage("index")}
            />
          </div>

          <div
            className={
              isMobile
                ? "shadow p-4 m-2 mt-0 bg-white rounded"
                : "shadow p-5 m-5 mt-0 bg-white rounded"
            }
          >
            <HeaderForm label="Formulir Peraturan Eksternal" />
            <div className="row">
              <TextField
                label="Nomor Induk Dokumen"
                isRequired={true}
                name="Nomor Induk Dokumen"
                value={formData.NomorIndukDokumen}
                onChange={handleInputChange}
              />
            </div>
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
              <TextField
                label="Tahun Dokumen"
                isRequired={true}
                name="Tahun Dokumen"
                value={formData.TahunDokumen}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
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
            <div className="row">
              <TextField
                label="Tahun Kadaluarsa"
                isRequired={true}
                name="Tahun Kadaluarsa"
                value={formData.TahunKadaluarsa}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <FileUpload
                label="Dokumen"
                isRequired={true}
                name="Dokumen"
                value={formData.Dokumen}
                onChange={handleInputChange}
              />
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
