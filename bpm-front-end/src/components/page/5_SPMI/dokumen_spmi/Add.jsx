import React, { useState, useRef } from "react";
import { useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import InputField from "../../../part/InputField";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import DocUpload from "../../../part/DocUpload";
import DropDown from "../../../part/Dropdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROOT_LINK } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";
import FileUpload from "../../../part/FileUpload";
import { useIsMobile } from "../../../util/useIsMobile";

export default function Add() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentPath = location.pathname;
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const title = "Tambah Data";
  const arrData = [
    { Value: "Controlled Copy", Text: "Controlled Copy" },
    { Value: "Uncontrolled Copy", Text: "Uncontrolled Copy" },
  ];

  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    judulDok: "",
    nomorDok: "",
    tanggalDok: "",
    kadaluarsaDok: "",
    jenisDok: "",
  });

  const judulDokRef = useRef();
  const nomorDokRef = useRef();
  const tanggalDokRef = useRef();
  const kadaluarsaDokRef = useRef();
  const jenisDokRef = useRef();
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (updatedFiles) => {
    setFile(updatedFiles);
    console.log(file);
  };

  const handleSubmit = async () => {
    const isJudulDokValid = judulDokRef.current?.validate();
    const isNomorDokValid = nomorDokRef.current?.validate();
    const isTanggalDokValid = tanggalDokRef.current?.validate();
    const isKadaluarsaDokValid = kadaluarsaDokRef.current?.validate();
    const isJenisDokValid = jenisDokRef.current?.validate();
    const isFileValid = fileRef.current?.validate();

    console.log('masuk sini');

    if (!isJudulDokValid) {
      judulDokRef.current?.focus();
      return;
    }
    if (!isNomorDokValid) {
      nomorDokRef.current?.focus();
      return;
    }
    if (!isTanggalDokValid) {
      tanggalDokRef.current?.focus();
      return;
    }
    if (!isKadaluarsaDokValid) {
      kadaluarsaDokRef.current?.focus();
      return;
    }
    console.log('masuk sini 2');
    if (!isJenisDokValid) {
      jenisDokRef.current?.focus();
      return;
    }
    if (!isFileValid) {
      fileRef.current?.focus();
      return;
    }
    const dokData = {
      judulDok: judulDokRef.current.value,
      nomorDok: nomorDokRef.current.value,
      tanggalDok: tanggalDokRef.current.value,
      kadaluarsaDok: kadaluarsaDokRef.current.value,
      jenisDok: jenisDokRef.current.value,
      fileDok: file,
      createdBy: "User404",
    };

    console.log("Successfully submited!");
    console.log(dokData);

    SweetAlert("Berhasil!", "Data berhasil ditambahkan.", "success", "OK");
    //try {
    // Upload foto
    // const formData = new FormData();
    // formData.append("files", file));

    // const folderName = "Dokumen";

    // const uploadResponse = await fetch(
    //   `${API_LINK}/Upload/UploadDokumen?folderName=${encodeURIComponent(
    //     folderName
    //   )}&idMenu=${encodeURIComponent(location.state.idData)}`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );

    // if (!uploadResponse.ok) {
    //   throw new Error("Gagal mengunggah dokumen");
    // }

    // const uploadedDokNames = await uploadResponse.json();

    // const createResponse = await useFetch(
    //   `${API_LINK}/MasterDokumen/CreateDokumen`,
    //   beritaData,
    //   "POST"
    // );

    // if (createResponse === "ERROR") {
    //   throw new Error("Gagal memperbarui data");
    // }

    // } catch (error) {
    //   console.error("Error:", error.message);
    //   SweetAlert("Gagal!", error.message, "error", "OK");
    // }
  };

  useEffect(() => {
    console.log(location.state);
    // if (location.state.idData == null) return;
    setBreadcrumbs(location.state.breadcrumbs);
  }, [location.state]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
          <div className="p-3">
            <PageTitleNav
              title={title}
              breadcrumbs={breadcrumbs}
              onClick={() =>
                navigate(location.state.prevPath, {
                  state: {
                    idData: location.state.idData,
                    breadcrumbs: location.state.breadcrumbs,
                  },
                })
              }
            />
          </div>
          <div className={isMobile ? "m-0" : "m-3"}>
            {/* Main Content Section */}
            <div
              className={
                isMobile
                  ? "shadow p-4 m-2 mt-0 bg-white rounded"
                  : "shadow p-5 m-5 mt-0 bg-white rounded"
              }
            >
              {" "}
              <HeaderForm label="Formulir Dokumen" />
              <InputField
                ref={judulDokRef}
                label="Judul Dokumen"
                value={formData.judulDok}
                onChange={handleChange}
                isRequired={true}
                name="judulDok"
                type="text"
                maxChar="100"
              />
              <div className="row">
                <div className="col-lg-6 col-md-6 ">
                  <InputField
                    ref={nomorDokRef}
                    label="Nomor Dokumen"
                    value={formData.nomorDok}
                    onChange={handleChange}
                    isRequired={true}
                    name="nomorDok"
                    type="text"
                    maxChar="50"
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <InputField
                    ref={tanggalDokRef}
                    label="Tanggal Berlaku"
                    value={formData.tanggalDok}
                    onChange={handleChange}
                    isRequired={true}
                    name="tanggalDok"
                    type="date"
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <DropDown
                    arrData={arrData}
                    type="pilih"
                    label="Jenis Dokumen"
                    forInput="jenisDok"
                    isRequired={true}
                    onChange={handleChange}
                    value={formData.jenisDok}
                    ref={jenisDokRef}
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <InputField
                    ref={kadaluarsaDokRef}
                    label="Tanggal Kadaluarsa"
                    value={formData.kadaluarsaDok}
                    onChange={handleChange}
                    isRequired={true}
                    name="kadaluarsaDok"
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <FileUpload
                  label="Dokumen"
                  forInput="fileDok"
                  onChange={handleFileChange}
                  name="fileDok"
                  ref={fileRef}
                  isRequired={true}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1 m-2">
                  <Button
                    classType="primary"
                    type="submit"
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
                    onClick={() =>
                      navigate(location.state.prevPath, {
                        state: {
                          idData: location.state.idData,
                          breadcrumbs: location.state.breadcrumbs,
                        },
                      })
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
