import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_LINK, DOKUMEN_LINK } from "../../../util/Constants";
import { useFetch } from "../../../util/useFetch";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import SearchField from "../../../part/SearchField";
import Button from "../../../part/Button";
import Filter from "../../../part/Filter";
import Breadcrumbs from "../../../part/Breadcrumbs";
import DropDown from "../../../part/Dropdown";
import SweetAlert from "../../../util/SweetAlert";
import Cookies from "js-cookie";
import { useIsMobile } from "../../../util/useIsMobile";

const arrSort = [
  { Value: "[namaKri] ASC", Text: "Nama Kriteria [↑]" },
  { Value: "[namaKri] DESC", Text: "Nama Kriteria [↓]" },
];

const arrStatus = [
  { Value: "Aktif", Text: "Aktif" },
  { Value: "Tidak Aktif", Text: "Tidak Aktif" },
];

const breadcrumbs = [{ label: "Evaluasi" }, { label: "Bank Pertanyaan" }];

export default function Index({ onChangePage }) {
  const isMobile = useIsMobile();
  const activeUser = Cookies.get("activeUser");
  const location = useLocation();

  const [pageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [selectedSort, setSelectedSort] = useState("namaKriteria DESC");
  const [filteredData, setFilteredData] = useState([]);
  const idMenu = location.state?.idMenu;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  const fetchKriteria = async () => {
    setLoading(true);
    try {
      const result = await useFetch(
        `${API_LINK}/MasterBankPertanyaanAudit/GetDataBankPertanyaanAudit`,
        {
          param1: searchKeyword,
          param2: selectedSort,
          param3: pageSize,
          param4: pageCurrent,
        },
        "POST"
      );

      if (result === "ERROR" || result === null || result.length === 0) {
        setFilteredData([]);
        setTotalData(0);
      } else {
        const arrResult = Object.values(result);
        setFilteredData(arrResult);
        setTotalData(arrResult[0].TotalCount);
      }
    } catch (err) {
      setError("Gagal mengambil data: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKriteria();
  }, [selectedSort, searchKeyword, pageCurrent]);

  const handleToggle = (item) => {
    // Tampilkan konfirmasi menggunakan SweetAlert sebelum toggle status
    SweetAlert(
      "Konfirmasi",
      `Apakah Anda yakin ingin ${
        item.status === "Aktif" ? "menonaktifkan" : "mengaktifkan"
      } data ini?`,
      "question",
      "Ya",
      null,
      "",
      true // Tampilkan tombol batal
    ).then((result) => {
      if (result) {
        // Jika pengguna mengonfirmasi, hanya simpan idKri dan status yang diperbarui
        const updatedData = filteredData
          .filter((data) => data.idKri === item.Key)
          .map((data) => ({
            idKri: data.idKri,
            status: data.status === "Aktif" ? "Tidak Aktif" : "Aktif",
          }));

        useFetch(
          `${API_LINK}/MasterKriteria/EditStatusKriteria`,
          updatedData[0]
        )
          .then((response) => {
            if (response === "ERROR") {
              throw new Error("Gagal memperbarui data");
            }
            SweetAlert(
              "Berhasil!",
              updatedData[0].status === "Aktif"
                ? "Data data berhasil diaktifkan"
                : "Data data berhasil dinonaktifkan",
              "success",
              "OK"
            ).then(() => {
              fetchKriteria();
            });
          })
          .catch((error) => {
            SweetAlert("Gagal!", error.message, "error", "OK");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  if (error)
    return (
      <div>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        <div className="d-flex flex-column">
          <div className={isMobile ? "m-0 p-0" : "m-3 ms-5 ps-5 mb-0"}>
            <h1 style={{ color: "#2654A1", margin: "0", fontWeight: "700" }}>
              Bank Pertanyaan
            </h1>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>

          <div
            className={
              isMobile ? "p-2 m-2 mt-2 mb-0" : "p-3 ps-5 m-5 mt-2 mb-0"
            }
            style={{ marginLeft: "50px" }}
          >
            <Button
              iconName="add"
              classType="primary"
              label="Tambah Data"
              onClick={() =>
                onChangePage("add", {
                  idMenu: idMenu,
                  breadcrumbs: breadcrumbs,
                })
              }
            />
          </div>

          <div
            className={
              isMobile
                ? "table-container bg-white p-1 m-1 mt-0 rounded"
                : "table-container bg-white p-3 p-5 pt-0 pb-0  m-5 mt-0 rounded"
            }
          >
            <div className="row mb-3">
              <div className="col-12 d-flex flex-wrap align-items-center">
                <div className="me-auto flex-grow-1 mt-3 me-3">
                  <SearchField />
                </div>
                <div className="m-0">
                  <Filter>
                    <DropDown
                      arrData={arrSort}
                      label="Urut Berdasarkan"
                      type="pilih"
                      defaultValue="[namaKri] ASC"
                      forInput="sortFilter"
                      onChange={(e) =>
                        setCurrentFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            param3: e.target.value,
                          };
                        })
                      }
                    />
                    <DropDown
                      arrData={arrStatus}
                      label="Status"
                      type="pilih"
                      defaultValue="Aktif"
                      forInput="statusFilter"
                      onChange={(e) =>
                        setCurrentFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            param1: e.target.value,
                          };
                        })
                      }
                    />
                  </Filter>
                </div>
              </div>
            </div>

            <Table
              arrHeader={["No", "Nama Kriteria"]}
              data={filteredData.map((item, index) => ({
                Key: item.idKri,
                No: (pageCurrent - 1) * pageSize + index + 1,
                "Nama Kriteria": item.namaKri,
                status: item.status,
              }))}
              actions={(row) => {
                // Jika status "Tidak Aktif", hanya tampilkan Toggle
                if (row.status === "Tidak Aktif") {
                  return ["Toggle"];
                }
                // Jika status selain "Tidak Aktif", tampilkan semua actions
                return ["Detail", "Edit", "Toggle"];
              }}
              onToggle={handleToggle}
            />

            <Paging
              pageSize={pageSize}
              pageCurrent={pageCurrent}
              totalData={totalData}
              navigation={handlePageNavigation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
