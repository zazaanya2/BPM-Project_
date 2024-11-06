import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/backbone/Header'; 
import Footer from './components/backbone/Footer';

import Coba from './components/page/1_Beranda/Coba'; 

import Tentang from './components/page/2_Tentang/Root';
import Berita from './components/page/3_Berita/Root';

function App() {
  return (
    <Router> {/* Wrap the entire app in Router */}
      <div className="d-flex flex-column min-vh-100">
        {/* Header Component */}
        <Header />

        <main className="flex-grow-1" >
          <Tentang/>
          <Berita/>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
