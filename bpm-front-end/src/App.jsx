import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/part/Table";
import Paging from "./components/part/Paging";
import Alert from "./components/part/Alert";
import Loading from "./components/part/Loading";

function App() {
  const [pageSize] = useState(10); // Set the page size to 10
  const [pageCurrent, setPageCurrent] = useState(1); // Current page state
  const [currentData, setCurrentData] = useState([]); // Data for the current page
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state

  // Static data for Kriteria Kuesioner
  const data = [
    { Key: 1, ID_Kriteria: "K1", Kriteria: "Kriteria 1", Status: "Aktif" },
    { Key: 2, ID_Kriteria: "K2", Kriteria: "Kriteria 2", Status: "Aktif" },
    { Key: 3, ID_Kriteria: "K3", Kriteria: "Kriteria 3", Status: "Tidak Aktif" },
    { Key: 4, ID_Kriteria: "K4", Kriteria: "Kriteria 4", Status: "Aktif" },
    { Key: 5, ID_Kriteria: "K5", Kriteria: "Kriteria 5", Status: "Aktif" },
    { Key: 6, ID_Kriteria: "K6", Kriteria: "Kriteria 6", Status: "Tidak Aktif" },
    { Key: 7, ID_Kriteria: "K7", Kriteria: "Kriteria 7", Status: "Aktif" },
    { Key: 8, ID_Kriteria: "K8", Kriteria: "Kriteria 8", Status: "Aktif" },
    { Key: 9, ID_Kriteria: "K9", Kriteria: "Kriteria 9", Status: "Aktif" },
    { Key: 10, ID_Kriteria: "K10", Kriteria: "Kriteria 10", Status: "Aktif" },
    { Key: 11, ID_Kriteria: "K11", Kriteria: "Kriteria 11", Status: "Aktif" },
    { Key: 12, ID_Kriteria: "K12", Kriteria: "Kriteria 12", Status: "Tidak Aktif" },
    { Key: 13, ID_Kriteria: "K13", Kriteria: "Kriteria 13", Status: "Aktif" },
    { Key: 14, ID_Kriteria: "K14", Kriteria: "Kriteria 14", Status: "Aktif" },
    { Key: 15, ID_Kriteria: "K15", Kriteria: "Kriteria 15", Status: "Aktif" },
  ];

  // Calculate the index for slicing data
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentDataSlice = data.slice(indexOfFirstData, indexOfLastData);

  // Function to handle page navigation
  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Simulate an error for demonstration purposes
      if (Math.random() < 0.1) {
        setIsError(true);
      } else {
        setCurrentData(currentDataSlice);
        setIsError(false);
      }
      setIsLoading(false);
    }, 500); // Simulate a delay
  }, [pageCurrent, currentDataSlice]);

  return (
    <div className="d-flex flex-column">
      {isError && (
        <div className="flex-fill">
          <Alert
            type="warning"
            message="Terjadi kesalahan: Gagal mengambil data kriteria."
          />
        </div>
      )}
      <div className="table-container bg-white p-4 m-3 rounded">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Table
              arrHeader={["ID Kriteria", "Kriteria", "Status"]}
              data={currentDataSlice}
              actions={["Toggle"]} // Ensure the Table component can handle this
              onToggle={(id) => {
                // Handle toggle status
                console.log("Toggle status for ID:", id);
              }}
            />
            <Paging
              pageSize={pageSize}
              pageCurrent={pageCurrent}
              totalData={data.length} // Total data count
              navigation={handlePageNavigation}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
