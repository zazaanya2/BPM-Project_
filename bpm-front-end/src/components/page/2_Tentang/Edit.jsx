import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTitleNav from "../../part/PageTitleNav";
import TextArea from "../../part/TextArea";
import HeaderForm from "../../part/HeaderText";
import Button from "../../part/Button";
import DetailData from "../../part/DetailData";
import { API_LINK } from "../../util/Constants";
import Loading from "../../part/Loading";
import FileUpload from "../../part/FileUpload";
import UploadFoto from "../../part/UploadFoto";
import SweetAlert from "../../util/SweetAlert";
import uploadFile from "../../util/UploadFile";

export default function Edit({ onChangePage }) {
  const location = useLocation();

  const [formData, setFormData] = useState({
    Kategori: "",
    Isi: "",
    Createby: "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (location.state?.idData) {
      const editId = location.state.idData;
      setLoading(true);
      fetch(API_LINK + `/api/MasterTentang/GetDataTentangById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ten_id: editId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setFormData({
              Kategori: data[0].ten_category,
              Isi: data[0].ten_isi,
              Createby: data[0].ten_created_by,
            });
          }
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }
  }, [location.state?.idData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    setSelectedFile(file); // Store file in state
  };

  const renderContent = () => {
    const id = location.state?.idData;

    if (id === 7) {
      return (
        <UploadFoto
          id="upload-foto"
          label="Upload Foto"
          onChange={(file) => handleFileChange(file)}
          hasExisting={formData.Isi}
          isRequired="true"
        />
      );
    } else if (id === 8) {
      return (
        <FileUpload
          label="Upload File"
          forInput="upload-file"
          formatFile=".pdf"
          onChange={(e) => handleFileChange(e.target.files[0])}
          hasExisting={formData.Isi}
          isRequired="true"
        />
      );
    } else {
      return (
        <TextArea
          label="Isi"
          name="Isi"
          value={formData.Isi}
          onChange={handleInputChange}
          isRequired="true"
        />
      );
    }
  };

  const handleSave = async () => {
    const currentTimestamp = new Date().toISOString();
    setLoading(true);

    try {
      let ten_isi = formData.Isi;

      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile);
        if (uploadResult === "ERROR") {
          throw new Error("File upload failed");
        }
        ten_isi = uploadResult.hasil || ten_isi; // Use the result from upload
      }

      const response = await fetch(
        API_LINK + "/api/MasterTentang/EditTentang",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ten_id: location.state.idData,
            ten_category: formData.Kategori,
            ten_isi,
            ten_status: 1,
            ten_modif_by: "User",
            ten_modif_date: currentTimestamp,
          }),
        }
      );

      const text = await response.text();
      const data = JSON.parse(text);

      SweetAlert(
        "Berhasil!",
        "Data berhasil diperbarui.",
        "success",
        "OK"
      ).then(() => onChangePage("read"));
    } catch (error) {
      console.error("Error saving data:", error);
      SweetAlert(
        "Terjadi Kesalahan!",
        "Terjadi kesalahan saat menyimpan data.",
        "error",
        "OK"
      );
    } finally {
      setLoading(false);
    }
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
              <DetailData label="Kategori" isi={formData.Kategori} />
              <DetailData label="Dibuat Oleh" isi={formData.Createby} />
            </div>
            {renderContent()}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button
                classType="primary"
                type="submit"
                label="Simpan"
                width="100%"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </main>

      {loading && <Loading />}
    </div>
  );
}
