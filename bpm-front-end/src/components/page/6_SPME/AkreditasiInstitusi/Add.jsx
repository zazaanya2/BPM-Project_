import PageTitleNav from "../../../part/PageTitleNav";
import TextField from "../../../part/TextField";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import DropDown from "../../../part/Dropdown";
import DocUpload from "../../../part/DocUpload";
import FileUpload from "../../../part/FileUpload";
import InputField from "../../../part/InputField";
import React,{ useRef, useState } from "react";
import { API_LINK } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";
import { useFetch } from "../../../util/useFetch";


export default function Add({ onChangePage }) {
  const title = "Akreditasi Institusi";
  const breadcrumbs = [
    { label: "SPME" },
    { label: "Status Akreditasi" },
    { label: "Institusi" },
    { label: "Tambah" },
  ];

  const arrData = [
    { Value: "Controlled Copy", Text: "Controlled Copy" },
    { Value: "Uncontrolled Copy", Text: "Uncontrolled Copy" },
  ];
  
  const arrAkre = [
    { Value: "Unggul", Text: "Unggul" },
    { Value: "Baik Sekali", Text: "Baik Sekali" },
    { Value: "Baik", Text: "Baik" },
    { Value: "A", Text: "A" },
    { Value: "B", Text: "B" },
    { Value: "C", Text: "C" },
    { Value: "Belum Terakreditasi", Text: "Belum Terakreditasi" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const [formData, setFormData] = useState({
      kodeProdi: "",
      namaProdi: "",
      jenjang: "",
      wilayah: "",
      noSK: "",
      tahunSK: "",
      peringkat: "",
      tanggalBerlaku: "",
    });

   const kodeProdiRef = useRef();
    const namaProdiRef = useRef();
    const jenjangRef = useRef();
    const wilayahRef = useRef();
    const noSKRef = useRef();
    const tahunSKRef = useRef();
    const peringkatRef = useRef();
    const tanggalBerlakuRef =  useState();
   

  const handleSubmit = async () => {
    const iskodeProdiValid = kodeProdiRef.current?.validate();
    const isNamaProdiValid = namaProdiRef.current?.validate();
    const isjenjangValid = jenjangRef.current?.validate();
    const iswilayahValid = wilayahRef.current?.validate();
    const isnoSKValid = noSKRef.current?.validate();
    const istahunSKValid = tahunSKRef.current?.validate();
    const isperingkatValid = peringkatRef.current?.validate();
    const istanggalBerlakuValid = tanggalBerlakuRef.current?.validate();

    console.log("masuk sini");

   

    if (!iskodeProdiValid) {
      kodeProdiRef.current?.focus();
      return;
    }
    if (!isNamaProdiValid) {
      namaProdiRef.current?.focus();
      return;
    }
    if (!isjenjangValid) {
      jenjangRef.current?.focus();
      return;
    }
    if (!iswilayahValid) {
      wilayahRef.current?.focus();
      return;
    }
   
    if (!isnoSKValid) {
      noSKRef.current?.focus();
      return;
    }
    if (!istahunSKValid) {
      tahunSKRef.current?.focus();
      return;
    }
    if (!isperingkatValid) {
      peringkatRef.current?.focus();
      return;
    }
    if (!istanggalBerlakuValid) {
      tanggalBerlakuRef.current?.focus();
      return;
    }
  
  
    try {
    

      const dokData = {
        kodeProdi: kodeProdiRef.current.value,
        namaProdi: namaProdiRef.current.value,
        jenjang: jenjangRef.current.value,
        wilayah: wilayahRef.current.value,
        noSK: noSKRef.current.value,
        tahunSK: tahunSKRef.current.value,
        peringkat: peringkatRef.current.value,
        tanggalBerlaku: tanggalBerlakuRef.current.value,
        createdBy: "Unknown",
      };

      const createResponse = await useFetch(
        `${API_LINK}/MasterAkreditasi/CreateDataAkreditasi`,
        dokData,
        "POST"
      );

      if (createResponse === "ERROR") {
        throw new Error("Gagal memperbarui data");
      } else {
        SweetAlert(
          "Berhasil!",
          "Data berhasil ditambahkan.",
          "success",
          "OK"
        ).then(() => onChangePage("index"));
      }
    } catch (error) {
      console.error("Error:", error.message);
      SweetAlert("Gagal!", error.message, "error", "OK");
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 mb-5" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className="container mb-3">
            {/* Breadcrumbs and Page Title */}
            <div className="mt-4">
              <PageTitleNav
                title={title}
                breadcrumbs={breadcrumbs}
                onClick={() => onChangePage("index")}
              />
            </div>

            {/* Main Content Section */}
            <div className="shadow p-5 mt-0 bg-white rounded">
              <HeaderForm label={"Formulir "+title} />
              <div className="row">
                <InputField 
                ref={kodeProdiRef}
                label="Kode Prodi " isRequired={true}
                value={formData.kodeProdi}
                onChange={handleChange}
                type="text"
                name="kodeProdi"
                maxChar="100"/>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 ">
                  <InputField 
                  ref={namaProdiRef}
                  label="Nama Prodi"
                  value={formData.namaProdi}
                  onChange={handleChange} 
                  isRequired="true" 
                  name="namaProdi"
                  type="text"
                  maxChar="50"
                  />
                </div>
               
                <div className="col-lg-6 col-md-6">
                  <InputField
                    label="Jenjang"
                    isRequired={true}
                    onChange={handleChange}
                    errorMessage=""
                    value={formData.jenjang}
                    ref={jenjangRef}
                    name="jenjang"
                    type="text"
                  />
                </div> 

                <div className="col-lg-6 col-md-6">
                  <InputField
                    label="Wilayah"
                    isRequired={true}
                    onChange={handleChange}
                    errorMessage="" 
                    value= {formData.wilayah}
                    ref={wilayahRef}
                    name= "wilayah"
                    type= "text"
                    
                  />
                </div>

                <div className="col-lg-6 col-md-6">
                  <InputField
                    label="No SK"
                    isRequired={true}
                    onChange={handleChange}
                    errorMessage="" 
                    value= {formData.noSK}
                    ref={noSKRef}
                    name= "noSK"
                    type= "text"
                  />
                </div>

                <div className="col-lg-6 col-md-6">
                  <InputField
                    label="Tahun SK"
                    isRequired={true}
                    onChange={handleChange}
                    value= {formData.tahunSK}
                    ref={tahunSKRef}
                    name= "tahunSK"
                   type= "text"
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <InputField
                    label="Peringkat"
                    isRequired={true}
                    onChange={handleChange}
                    errorMessage="" 
                    value= {formData.peringkat}
                    ref={peringkatRef}
                    name= "peringkat"
                    type = "text"
                  />
                </div>
              </div>
              
              <div className="col-lg-6 col-md-6">
                  <InputField
                    ref={tanggalBerlakuRef}
                    label="Tanggal Berlaku"
                    value={formData.tanggalBerlaku}
                    onChange={handleChange}
                    isRequired="true"
                    name="tanggalBerlaku"
                    type="date"
                  />
                </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
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
