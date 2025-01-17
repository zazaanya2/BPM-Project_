import React, { useState, useRef, useEffect } from "react";
import PageTitleNav from "../../../part/PageTitleNav";
import InputField from "../../../part/InputField";
import HeaderForm from "../../../part/HeaderText";
import Button from "../../../part/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SweetAlert from "../../../util/SweetAlert";
import { useIsMobile } from "../../../util/useIsMobile";
import { API_LINK } from "../../../util/Constants";
import { useFetch } from "../../../util/useFetch";
import DropDown from "../../../part/Dropdown";
import TextArea from "../../../part/TextArea";
import CheckBox from "../../../part/CheckBox";
import Loading from "../../../part/Loading";
import TabSelfAssesment from "./TabSelfAssessment";
import { uploadFile } from "../../../util/UploadFile";

export default function EditSelfAssessment({ onChangePage }) {
  const isMobile = useIsMobile();

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const idData = location.state?.idData;
  const title = location.state?.instrumen;

  const [kriteria, setKriteria] = useState([]);

  useEffect(() => {
    const fetchKriteria = async () => {
      setLoading(true);
      try {
        const data = await useFetch(
          `${API_LINK}/TransaksiSelfAssessment/GetDataKriteriaSAById`,
          { id: idData },
          "POST"
        );

        setKriteria(data);
      } catch (err) {
        setError("Gagal mengambil data: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchKriteria();
  }, []);

  const [pertanyaan, setPertanyaan] = useState([]);

  useEffect(() => {
    const fetchPertanyaan = async () => {
      setLoading(true);
      try {
        const data = await useFetch(
          `${API_LINK}/TransaksiSelfAssessment/GetDataPertanyaanSAById`,
          { id: idData },
          "POST"
        );

        setPertanyaan(data);
      } catch (err) {
        setError("Gagal mengambil data: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchPertanyaan();
  }, []);

  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleDataChange = (updatedFormData, updatedFiles) => {
    setFormData(updatedFormData);
    setFiles(updatedFiles);

    console.log(updatedFormData);
    console.log(updatedFiles);
  };

  const handleSubmit = async () => {
    const folderName = "Audit";
    const updatedFormData = { ...formData };

    // Loop melalui objek files
    for (const [key, fileArray] of Object.entries(files)) {
      const dokumenBerkasArray = [];

      for (const file of fileArray) {
        if (typeof file === "string") {
          // Jika file adalah string (path file yang sudah ada), langsung tambahkan ke array dokumen berkas
          dokumenBerkasArray.push(file);
        } else if (file instanceof File) {
          // Jika file adalah File object, kirim ke API
          const filePrefix = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/\s+/g, "_");

          const fileFormData = new FormData();
          fileFormData.append("file", file);

          try {
            const dokumenBerkas = await uploadFile(
              file,
              folderName,
              filePrefix
            );

            if (Array.isArray(dokumenBerkas)) {
              dokumenBerkasArray.push(...dokumenBerkas);
            } else {
              dokumenBerkasArray.push(dokumenBerkas);
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      }

      if (updatedFormData[key]) {
        updatedFormData[key].dokumenBerkas = dokumenBerkasArray;
        updatedFormData[key].idSea = idData; // Menambahkan idSea pada setiap objek
      }
    }

    for (const [key, value] of Object.entries(updatedFormData)) {
      const updatedObject = {
        id: Number(key),
        jawaban: value.jawaban,
        jawabanLanjutan: value.jawabanLanjutan,
        idSea: value.idSea,
        dokumenBerkas: value.dokumenBerkas,
      };

      console.log(updatedObject);

      const createResponse = await useFetch(
        `${API_LINK}/TransaksiSelfAssessment/EditSelfAssesment`,
        updatedObject
      );
      if (createResponse === "ERROR") {
        throw new Error("Gagal menambah data");
      }
    }

    SweetAlert("Berhasil!", "Data berhasil diperbarui.", "success", "OK").then(
      () => onChangePage("index")
    );
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
          <div className="p-3">
            <PageTitleNav
              title={title}
              breadcrumbs={location.state.breadcrumbs}
              onClick={() => onChangePage("index")}
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
              <HeaderForm label="Formulir Self Assessment" />

              <TabSelfAssesment
                header={kriteria}
                pertanyaan={pertanyaan}
                onDataChange={handleDataChange}
              />

              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1 m-2">
                  <Button
                    classType="primary"
                    type="button"
                    label="Simpan"
                    width="100%"
                    onClick={handleSubmit}
                    isDisabled={Object.keys(formData).length === 0}
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
        </div>
      </main>
    </div>
  );
}
