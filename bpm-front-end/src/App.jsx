import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/backbone/Header";
import Footer from "./components/backbone/Footer";
import Tentang from "./components/page/2_Tentang/Root";
import Berita from "./components/page/3_Berita/Root";
import RencanaKegiatan from "./components/page/4_Kegiatan/Root";
import Survei from "./components/page/9_Survei/Root";
import Peraturan from "./components/page/10_Peraturan/ms_kebijakanPeraturan/Root";
import PeraturanEksternal from "./components/page/10_Peraturan/ms_peraturanEksternal/Root";
import InstrumenAps from "./components/page/10_Peraturan/ms_instrumenAps/Root";

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/backbone/Header'; 
import Footer from './components/backbone/Footer';
import Tentang from './components/page/2_Tentang/Root';
import Berita from './components/page/3_Berita/Root';
import RencanaKegiatan from './components/page/4_Kegiatan/Root'
import KriteriaSurvei from './components/page/9_Survei/Kriteria_Survei/Root';
function App() {
  return (
    <Router>
      {" "}
      {/* Wrap the entire app in Router */}
      <div className="d-flex flex-column min-vh-100">
        {/* Header Component */}
        <Header />

        <main className="flex-grow-1">
          <Tentang />
          <Berita />
          <RencanaKegiatan />
          <Survei />
          <Peraturan />
          <PeraturanEksternal />
          <InstrumenAps />
        <main className="flex-grow-1" >
          <Tentang/>
          <Berita/>
          <RencanaKegiatan/>
          <KriteriaSurvei/>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
