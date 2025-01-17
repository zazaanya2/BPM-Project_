import React, { useEffect, useState } from "react";
import "moment/locale/id";
import HeaderText from "../../../part/HeaderText.jsx";
import { useIsMobile } from "../../../util/useIsMobile.js";
import { decodeHtml } from "../../../util/DecodeHtml.js";
import TextArea from "../../../part/TextArea.jsx";
import RadioButton from "../../../part/RadioButton.jsx";
import FileUpload from "../../../part/FileUploadMulti.jsx";

const arrJawaban = [
  { Value: "Ya", Text: "Ya" },
  { Value: "Tidak", Text: "Tidak" },
];

const TabSelfAssessment = ({ header, pertanyaan, onDataChange }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Mengubah state untuk menyimpan indeks yang ter-expand
  const isMobile = useIsMobile();
  const [files, setFiles] = useState({}); // Objek untuk menyimpan file berdasarkan ID
  const styleHeader = {
    backgroundColor: "#2654A1",
    color: "#fff",
    textAlign: "center",
  };

  const [formData, setFormData] = useState({});

  const [isInitialized, setIsInitialized] = useState(false); // Flag untuk mengecek apakah sudah diinisialisasi

  useEffect(() => {
    if (!isInitialized && pertanyaan.length > 0) {
      // Pastikan inisialisasi hanya terjadi sekali
      console.log("jalan");

      const initialFormData = pertanyaan.reduce((acc, item) => {
        acc[item.idPertanyaanSA] = {
          jawaban: item.jawaban || "",
          jawabanLanjutan: decodeHtml(item.jawabanLanjutan) || "",
          dokumenBerkas: item.berkasDokumen ? [item.berkasDokumen] : [],
        };
        return acc;
      }, {});

      // Inisialisasi files
      const initialFiles = pertanyaan.reduce((acc, item) => {
        if (item.berkasDokumen) {
          acc[item.idPertanyaanSA] = item.berkasDokumen;
        }
        return acc;
      }, {});

      setFormData(initialFormData);
      setFiles(initialFiles);
      setIsInitialized(true); // Tandai bahwa inisialisasi sudah selesai

      // Kirim data ke parent komponen saat pertama kali dimuat
      onDataChange(initialFormData, initialFiles);
    }
  }, [pertanyaan, isInitialized, onDataChange]);

  const handleInputChange = (id, field, value) => {
    const updatedFormData = {
      ...formData,
      [id]: { ...formData[id], [field]: value },
    };
    setFormData(updatedFormData);

    // Kirim data ke parent
    onDataChange(updatedFormData, files);
  };

  const handleFileChange = (idPertanyaan, file) => {
    const updatedFiles = {
      ...files,
      [idPertanyaan]: file,
    };
    setFiles(updatedFiles);

    // Kirim data ke parent
    onDataChange(formData, updatedFiles);
  };

  const handleExpandToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {header.map((kriteria, index) => (
        <div className="border rounded-5 shadow-sm m-0 mb-3 mt-3" key={index}>
          <div
            className={
              isMobile
                ? "card p-1 ps-4 text-gray d-flex justify-content-between align-items-left"
                : "card p-2 ps-4 text-gray d-flex justify-content-between align-items-left"
            }
            onClick={() => handleExpandToggle(index)} // Memanggil toggle expand saat klik
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <HeaderText
                label={kriteria.namaKriteria}
                warna="#2654A1"
                marginBottom="0"
                marginTop="0"
                ukuran={isMobile ? "1rem" : "1.2rem"}
                alignText="left"
              />
              <i
                className={`fi ${
                  expandedIndex === index
                    ? "fi-br-angle-small-up"
                    : "fi-br-angle-small-down"
                } ms-auto`}
                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
              ></i>
            </div>
          </div>
          {expandedIndex === index && ( // Cek apakah index yang dipilih sama dengan expandedIndex
            <div className="table-responsive m-3">
              <table
                className="table table-hover table-striped table-bordered"
                style={{ borderCollapse: "collapse", minWidth: "800px" }}
              >
                <thead>
                  <tr>
                    <th style={styleHeader}>No</th>
                    <th style={styleHeader}>Pertanyaan</th>
                    <th style={styleHeader}>Jawaban</th>
                  </tr>
                </thead>
                <tbody>
                  {pertanyaan
                    .filter(
                      (item) => item.namaKriteria === kriteria.namaKriteria
                    )
                    .map((item, index) => (
                      <tr key={item.idPertanyaanSA}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            width: "2rem",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            maxWidth: "28rem",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: decodeHtml(item.pertanyaan),
                            }}
                          ></div>

                          {item.pertanyaanLanjutan && (
                            <>
                              <p>Dokumen Pendukung:</p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: decodeHtml(item.pertanyaanLanjutan),
                                }}
                              ></div>
                            </>
                          )}

                          <div>
                            <TextArea
                              label="Jawaban"
                              value={
                                formData[item.idPertanyaanSA]
                                  ?.jawabanLanjutan || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  item.idPertanyaanSA,
                                  "jawabanLanjutan",
                                  e.target.value
                                )
                              }
                              isRequired={true}
                            />
                          </div>

                          <FileUpload
                            label="Berkas Pendukung"
                            forInput="upload-file"
                            formatFile=".pdf, .docx, .xlsx, .zip"
                            initialFiles={
                              formData[item.idPertanyaanSA]?.dokumenBerkas
                                ? formData[item.idPertanyaanSA]?.dokumenBerkas
                                : []
                            }
                            onChange={
                              (newFiles) =>
                                handleFileChange(item.idPertanyaanSA, newFiles) // Update parent state
                            }
                            isRequired="true"
                            isInitialFilesProcessed
                          />
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          <div style={{ marginBottom: "10px" }}>
                            <RadioButton
                              label="Jawaban"
                              name="options"
                              arrData={arrJawaban}
                              value={
                                formData[item.idPertanyaanSA]?.jawaban || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  item.idPertanyaanSA,
                                  "jawaban",
                                  e.target.value
                                )
                              }
                              isRequired={true}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabSelfAssessment;
