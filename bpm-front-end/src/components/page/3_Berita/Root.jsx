import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Read from './Read';
import Add from './Add';
import Edit from './Edit';
import LihatBerita from './LihatBerita';
import ScrollToTop from '../../part/ScrollToTop';

export default function Berita(){
    return(
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/berita" element={<Index/>}/>
                <Route path="/kelolaBerita" element={<Read />} />
                <Route path="/tambahBerita" element={<Add />} />
                <Route path="/editBerita/:id" element={<Edit />} />
                <Route path="/lihatBerita" element={<LihatBerita />} />
            </Routes>
        </>
    )
}