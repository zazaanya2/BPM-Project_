import React, { useState, useEffect, useRef } from "react";
import PageTitleNav from "../../part/PageTitleNav";
import TextField from "../../part/TextField";
import InputField from "../../part/InputField";
import HeaderForm from "../../part/HeaderText";
import Button from "../../part/Button";
import DocUpload from "../../part/DocUpload";
import Dropdown from "../../part/Dropdown";
import Loading from "../../part/Loading";
import { useLocation } from "react-router-dom";
import { uploadFile } from "../../util/UploadFile";
import { API_LINK } from "../../util/Constants";
import FileUpload from "../../part/FileUpload";
import SweetAlert from "../../util/SweetAlert";
import { useIsMobile } from "../../util/useIsMobile";
import { useFetch } from "../../util/useFetch";

// Dynamically set title and breadcrumbs based on idMenu
let title = "";
let titleHeader = "Formulir";
let breadcrumbs = [];

export default function Add({ onChangePage }) {
  const location = useLocation();
  const idMenu = location.state?.idMenu;
  const [loading, setLoading] = useState(true); // New loading state
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    judulDokumen: "",
    nomorInduk: "",
    tahunDokumen: "",
    jenisDokumen: "",
    tahunKadaluarsa: "",
    fileDokumen: "",
  });

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  // Refs for validation
  const judulDokumenRef = useRef();
  const nomorIndukRef = useRef();
  const tahunDokumenRef = useRef();
  const jenisDokumenRef = useRef();
  const tahunKadaluarsaRef = useRef();
  const fileDokumenRef = useRef();

  useEffect(() => {
    if (idMenu === 39) {
      title = "KEBIJAKAN PERATURAN";
      titleHeader = "Formulir Kebijakan Peraturan";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/kebijakan" },
        {
          label: "Kebijakan Peraturan",
          href: "/peraturan/kebijakan",
        },
        { label: "Tambah Kebijakan Peraturan" },
      ];
    } else if (idMenu === 40) {
      title = "PERATURAN EKSTERNAL";
      titleHeader = "Formulir Peraturan Eksternal";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/eksternal" },
        {
          label: "Peraturan Eksternal",
          href: "/peraturan/eksternal",
        },
        { label: "Tambah Peraturan Eksternal" },
      ];
    } else if (idMenu === 41) {
      title = "Instrumen APS";
      titleHeader = "Formulir Instrumen APS";
      breadcrumbs = [
        { label: "Peraturan", href: "/peraturan/aps" },
        {
          label: "Instrumen APS",
          href: "/peraturan/aps",
        },
        { label: "Tambah Instrumen APS" },
      ];
    }
    // Set loading to false once idMenu is determined
    setLoading(false);
  }, [idMenu]);

  const handleSubmit = async () => {
    if (!judulDokumenRef.current?.validate()) {
      judulDokumenRef.current?.focus();
      return;
    }
    if (!nomorIndukRef.current?.validate()) {
      nomorIndukRef.current?.focus();
      return;
    }
    if (!tahunDokumenRef.current?.validate()) {
      tahunDokumenRef.current?.focus();
      return;
    }
    if (!jenisDokumenRef.current?.validate()) {
      jenisDokumenRef.current?.focus();
      return;
    }
    if (!tahunKadaluarsaRef.current?.validate()) {
      tahunKadaluarsaRef.current?.focus();
      return;
    }
    if (!fileDokumenRef.current?.validate()) {
      fileDokumenRef.current?.focus();
      return;
    }

    console.log(formData);
    console.log(fileDokumenRef.current.value);

    let uploadedFilePeraturan = null;

    // if (selectedFile) {
    //   const folderName = "Kegiatan";
    //   const filePrefix = "NOTULEN";
    //   uploadedFileNotulen = await uploadFile(
    //     selectedFile,
    //     folderName,
    //     filePrefix
    //   );
    // }

    // setFormData((prevData) => {
    //   const newFormData = {
    //     ...prevData,
    //     fileNotulen: uploadedFileNotulen[0],
    //     fotoSampul: uploadedFotoSampul[0],
    //   };

    //   console.log(newFormData);

    //   setLoading(true);
    //   useFetch(
    //     `${API_LINK}/MasterKegiatan/CreateDokumentasiKegiatan`,
    //     newFormData,
    //     "POST"
    //   )
    //     .then((response) => {
    //       if (response === "ERROR") {
    //         throw new Error("Gagal memperbarui data");
    //       }
    //       SweetAlert(
    //         "Berhasil!",
    //         "Dokumentasi kegiatan berhasil dibuat.",
    //         "success",
    //         "OK"
    //       ).then(() => onChangePage("read"));
    //     })
    //     .catch((error) => {
    //       SweetAlert("Gagal!", error.message, "error", "OK");
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });

    //   return newFormData;
    // });
  };

  if (loading) return <Loading />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
          <div className="m-3">
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() => onChangePage("index", { idMenu: idMenu })}
            />
          </div>

          {/* Main Content Section */}
          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
            <HeaderForm label={titleHeader} />
            <div className="row">
              <InputField
                ref={judulDokumenRef}
                label="Judul Dokumen"
                value={formData.judulDokumen || ""}
                onChange={(e) =>
                  setFormData({ ...formData, judulDokumen: e.target.value })
                }
                isRequired={true}
              />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <InputField
                  ref={nomorIndukRef}
                  label="Nomor Induk Dokumen"
                  value={formData.nomorInduk || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nomorInduk: e.target.value })
                  }
                  isRequired={true}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <InputField
                  ref={tahunDokumenRef}
                  type="number"
                  label="Tahun Dokumen"
                  value={formData.tahunDokumen || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tahunDokumen: e.target.value })
                  }
                  isRequired={true}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <Dropdown
                  ref={jenisDokumenRef}
                  type="pilih"
                  forInput="jenisDokumen"
                  value={formData.jenisDokumen}
                  label="Jenis Dokumen"
                  isRequired={true}
                  arrData={[
                    { Text: "Controlled Copy", Value: "controlled" },
                    { Text: "Uncontrolled Copy", Value: "uncontrolled" },
                  ]}
                  onChange={(e) =>
                    setFormData({ ...formData, jenisDokumen: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <InputField
                  ref={tahunKadaluarsaRef}
                  type="number"
                  label="Tahun Kadaluarsa"
                  value={formData.tahunKadaluarsa || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tahunKadaluarsa: e.target.value,
                    })
                  }
                  isRequired={true}
                />
              </div>
            </div>
            <div className="row">
              <DocUpload
                ref={fileDokumenRef}
                label="Dokumen"
                forInput="fileDokumen"
                isRequired={true}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
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
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
