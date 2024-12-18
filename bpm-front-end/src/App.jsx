import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/backbone/Header";
import Footer from "./components/backbone/Footer";
import Login from "./components/page/login/Index";

import Beranda from "./components/page/1_Beranda/Root";
import Tentang from "./components/page/2_Tentang/Root";
import Berita from "./components/page/3_Berita/Root";
import JadwalKegiatan from "./components/page/4_Kegiatan/ms_jadwalKegiatan/Root";
import DokumentasiKegiatan from "./components/page/4_Kegiatan/ms_dokumentasiKegiatan/Root";
import Pelaksanaan from "./components/page/5_SPMI/siklus_spmi/pelaksanaan/Root";
import Penetapan from "./components/page/5_SPMI/siklus_spmi/penetapan/Root";
import Peningkatan from "./components/page/5_SPMI/siklus_spmi/peningkatan/Root";
import Pengendalian from "./components/page/5_SPMI/siklus_spmi/pengendalian/Root";
import Evaluasi from "./components/page/5_SPMI/siklus_spmi/evaluasi/Root";
import Peraturan from "./components/page/10_Peraturan/ms_kebijakanPeraturan/Root";
import PeraturanEksternal from "./components/page/10_Peraturan/ms_peraturanEksternal/Root";
import InstrumenAps from "./components/page/10_Peraturan/ms_instrumenAps/Root";
import KriteriaSurvei from "./components/page/9_Survei/Kriteria_Survei/Root";
import SkalaSurvei from "./components/page/9_Survei/Skala_Penilaian/Root";
import ScrollToTop from "./components/part/ScrollToTop";
import "./App.css";

// Component untuk menangani Header dan Footer
function Layout() {
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini
  const isLoginPage = location.pathname === "/login"; // Periksa jika halaman saat ini adalah "/login"

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isLoginPage && <Header />}{" "}
      {/* Tampilkan Header jika bukan halaman login */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Beranda />} />
          <Route path="/tentang/*" element={<Tentang />} />
          <Route path="/berita/*" element={<Berita />} />
          <Route path="/kegiatan/jadwal/*" element={<JadwalKegiatan />} />
          <Route
            path="/kegiatan/dokumentasi/*"
            element={<DokumentasiKegiatan />}
          />
          <Route path="/spmi/siklus/pelaksanaan/*" element={<Pelaksanaan />} />
          <Route path="/spmi/siklus/penetapan/*" element={<Penetapan />} />
          <Route path="/spmi/siklus/peningkatan/*" element={<Peningkatan />} />
          <Route
            path="/spmi/siklus/pengendalian/*"
            element={<Pengendalian />}
          />
          <Route path="/spmi/siklus/evaluasi/*" element={<Evaluasi />} />
          <Route path="/peraturan/kebijakan/*" element={<Peraturan />} />
          <Route
            path="/peraturan/eksternal/*"
            element={<PeraturanEksternal />}
          />
          <Route path="/peraturan/aps/*" element={<InstrumenAps />} />
          <Route path="/survei/kriteria/*" element={<KriteriaSurvei />} />
          <Route path="/survei/skala/*" element={<SkalaSurvei />} />

          {/* Halaman 404 */}
          <Route path="*" element={<div>Halaman tidak ditemukan</div>} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}{" "}
      {/* Tampilkan Footer jika bukan halaman login */}
    </div>
  );
}

// App Utama
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;
