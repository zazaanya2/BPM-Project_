import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Read from './Read';
import Add from './Add';
import Edit from './Edit';

export default function Berita(){
    return(
        <>
            <Routes>
                <Route path="/berita" element={<Index/>}/>
                <Route path="/kelolaBerita" element={<Read />} />
                <Route path="/tambahBerita" element={<Add />} />
                <Route path="/editBerita/:id" element={<Edit />} />
            </Routes>
        </>
    )
}