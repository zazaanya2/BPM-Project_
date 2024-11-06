import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/backbone/Header'; 
import Coba from './components/page/1_Beranda/Coba';        
import Footer from './components/backbone/Footer';

function App() {
  return (
    <Router> {/* Wrap the entire app in Router */}
      <div className="d-flex flex-column min-vh-100">
        {/* Header Component */}
        <Header />

        <main className="flex-grow-1" >
          {/* The main content is here */}
        </main>

        {/* Define your routes within the Routes component */}
        <Routes>
          <Route path="/kegiatan/rencana" element={<Coba />} /> {/* Map "/" to Coba component */}
          {/* Other Routes can be added here if needed */}
        </Routes>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
