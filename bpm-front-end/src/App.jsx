import { useState } from 'react';
import './App.css';
import Footer from './components/backbone/Footer';
import Table from './components/part/Table';
import Paging from './components/part/Paging'; // Make sure to import the Paging component
import PageTitleNav from './components/part/PageTitleNav';
import TextField from './components/part/TextField';
import Header from './components/backbone/Header';

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

  const title = "Kebijakan Peraturan";
  const subtitle = "Formulir Peraturan";
  const breadcrumbs = [
    { label: "SPMI", href: "#" },
    { label: "Dokumen SPMI", href: "#" },
    { label: "Kebijakan SPMI" }
  ];

  return ( 
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ marginTop: '60px' }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
          <div className="m-5">
            <PageTitleNav 
              title="New Title"
              breadcrumbs={[
                { label: "Home", href: "#" },
                { label: "Section", href: "#" },
                { label: "Current Page" } // No href means this is the current page
              ]}
              onClick={() => console.log("Icon clicked")}
            />
          </div>

          {/* Main Content Section */}
          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
            <TextField label="Nama" />
          </div>
          
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>

  );
  
}

export default App;
