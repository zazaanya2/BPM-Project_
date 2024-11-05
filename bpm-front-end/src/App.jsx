import { useState } from 'react';
import './App.css';
import Footer from './components/backbone/Footer';
import Table from './components/part/Table';
import Paging from './components/part/Paging'; // Make sure to import the Paging component

function App() {
  const [pageSize] = useState(10); // Set the page size to 10
  const [pageCurrent, setPageCurrent] = useState(1); // Current page state

  // Data with 15 entries
  const data = [
    { Key: 1, Nama: "Budi", Email: "budi@example.com", Alamat: "Jakarta" },
    { Key: 2, Nama: "Ani", Email: "ani@example.com", Alamat: "Bandung" },
    { Key: 3, Nama: "Cici", Email: "cici@example.com", Alamat: "Surabaya" },
    { Key: 4, Nama: "Dodi", Email: "dodi@example.com", Alamat: "Medan" },
    { Key: 5, Nama: "Eka", Email: "eka@example.com", Alamat: "Semarang" },
    { Key: 6, Nama: "Feri", Email: "feri@example.com", Alamat: "Malang" },
    { Key: 7, Nama: "Gina", Email: "gina@example.com", Alamat: "Yogyakarta" },
    { Key: 8, Nama: "Hani", Email: "hani@example.com", Alamat: "Solo" },
    { Key: 9, Nama: "Iwan", Email: "iwan@example.com", Alamat: "Bogor" },
    { Key: 10, Nama: "Joko", Email: "joko@example.com", Alamat: "Bekasi" },
    { Key: 11, Nama: "Kiki", Email: "kiki@example.com", Alamat: "Tangerang" },
    { Key: 12, Nama: "Lina", Email: "lina@example.com", Alamat: "Palembang" },
    { Key: 13, Nama: "Mira", Email: "mira@example.com", Alamat: "Batam" },
    { Key: 14, Nama: "Nina", Email: "nina@example.com", Alamat: "Padang" },
    { Key: 15, Nama: "Odi", Email: "odi@example.com", Alamat: "Pekanbaru" },
  ];

  // Calculate data to display for the current page
  const indexOfLastData = pageCurrent * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Function to handle page navigation
  const handlePageNavigation = (page) => {
    setPageCurrent(page);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="d-flex flex-column">
          <div className="table-container bg-white p-5 m-3 rounded">
            <Table
              arrHeader={["Nama", "Email", "Alamat"]}
              data={currentData} // Pass currentData to Table
              actions={["Detail", "Edit", "Delete", "Print", "Final", "PrintHistory", "UpdateHistory"]}
              onDelete={(id) => console.log("Delete", id)}
              onDetail={(id) => console.log("Detail", id)}
              onEdit={(id) => console.log("Edit", id)}
              onFinal={(id) => console.log("Final", id)}
              onPrint={(id) => console.log("Print", id)}
              onPrintHistory={(id) => console.log("Print History", id)}
              onUpdateHistory={(id) => console.log("Update History", id)}
            />

            {/* Paging Component */}
            <Paging
              pageSize={pageSize}
              pageCurrent={pageCurrent}
              totalData={data.length}
              navigation={handlePageNavigation}
            />
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
