import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Read from './Read';
import Add from './Add';

export default function Berita(){
    return(
        <>
            <Routes>
                <Route path="/berita" element={<Index/>}/>
                <Route path="/kelolaBerita" element={<Read />} />
                <Route path="/tambahBerita" element={<Add />} />
            </Routes>
        </>
    )
}