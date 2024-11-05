import { useState, useRef } from "react";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import Filter from "../../part/Filter";
import DropDown from "../../part/Dropdown";

const PAGE_SIZE = 10; // Assuming PAGE_SIZE is 10

const staticData = [
  { Key: "1", No: 1, "ID Kriteria Survei": "K001", "Kriteria Survei": "Kualitas Layanan", Status: "Aktif" },
  { Key: "2", No: 2, "ID Kriteria Survei": "K002", "Kriteria Survei": "Kecepatan Respon", Status: "Aktif" },
  { Key: "3", No: 3, "ID Kriteria Survei": "K003", "Kriteria Survei": "Keramahan Petugas", Status: "Tidak Aktif" },
  { Key: "4", No: 4, "ID Kriteria Survei": "K004", "Kriteria Survei": "Kebersihan Fasilitas", Status: "Aktif" },
  { Key: "5", No: 5, "ID Kriteria Survei": "K005", "Kriteria Survei": "Kenyamanan Ruangan", Status: "Aktif" },
];

const dataFilterSort = [
  { Value: "[Kriteria Survei] asc", Text: "Kriteria Survei [↑]" },
  { Value: "[Kriteria Survei] desc", Text: "Kriteria Survei [↓]" },
];

const dataFilterStatus = [
  { Value: "Aktif", Text: "Aktif" },
  { Value: "Tidak Aktif", Text: "Tidak Aktif" },
];

export default function KriteriaKuesionerIndex({ onChangePage }) {
  const [currentData, setCurrentData] = useState(staticData);
  const [currentFilter, setCurrentFilter] = useState({
    page: 1,
    query: "",
    sort: "[Kriteria Survei] asc",
    status: "Aktif",
  });

  const searchQuery = useRef();
  const searchFilterSort = useRef();
  const searchFilterStatus = useRef();

  function handleSetCurrentPage(newCurrentPage) {
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      page: newCurrentPage,
    }));
  }

  function handleSearch() {
    const newFilter = {
      ...currentFilter,
      page: 1,
      query: searchQuery.current.value,
      sort: searchFilterSort.current.value,
      status: searchFilterStatus.current.value,
    };
    setCurrentFilter(newFilter);
    applyFilter(newFilter);
  }

  function handleSetStatus(id) {
    const updatedData = currentData.map(item => {
      if (item["ID Kriteria Survei"] === id) {
        return { ...item, Status: item.Status === "Aktif" ? "Tidak Aktif" : "Aktif" };
      }
      return item;
    });
    setCurrentData(updatedData);
    alert(`Status kriteria ${id} berhasil diubah`);
  }

  function applyFilter(filter) {
    let filteredData = staticData;

    // Apply status filter
    if (filter.status !== "") {
      filteredData = filteredData.filter(item => item.Status === filter.status);
    }

    // Apply search query
    if (filter.query !== "") {
      const lowercaseQuery = filter.query.toLowerCase();
      filteredData = filteredData.filter(item => 
        item["Kriteria Survei"].toLowerCase().includes(lowercaseQuery) ||
        item["ID Kriteria Survei"].toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (filter.sort === "[Kriteria Survei] asc") {
        return a["Kriteria Survei"].localeCompare(b["Kriteria Survei"]);
      } else {
        return b["Kriteria Survei"].localeCompare(a["Kriteria Survei"]);
      }
    });

    setCurrentData(filteredData);
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="flex-fill">
          <div className="input-group">
            <Button
              iconName="add"
              classType="success"
              label="Tambah"
              onClick={() => onChangePage("add")}
            />
            <Input
              ref={searchQuery}
              forInput="pencarianKriteria"
              placeholder="Cari"
            />
            <Button
              iconName="search"
              classType="primary px-4"
              title="Cari"
              onClick={handleSearch}
            />
            <Filter>
              <DropDown
                ref={searchFilterSort}
                forInput="ddUrut"
                label="Urut Berdasarkan"
                type="none"
                arrData={dataFilterSort}
                defaultValue="[Kriteria Survei] asc"
              />
              <DropDown
                ref={searchFilterStatus}
                forInput="ddStatus"
                label="Status"
                type="none"
                arrData={dataFilterStatus}
                defaultValue="Aktif"
              />
            </Filter>
          </div>
        </div>
        <div className="mt-3">
          <div className="d-flex flex-column">
            <Table data={currentData} onToggle={handleSetStatus} />
            <Paging
              pageSize={PAGE_SIZE}
              pageCurrent={currentFilter.page}
              totalData={currentData.length}
              navigation={handleSetCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}