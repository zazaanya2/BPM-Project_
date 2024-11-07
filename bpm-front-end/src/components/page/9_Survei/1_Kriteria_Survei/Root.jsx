import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Add from './Add';

export default function Kriteria(){
    return(
        <>
            <Routes>
                <Route path="/survei/kriteria" element={<Index/>}/>
                <Route path="/tambahKriteria" element={<Add />} />
            </Routes>
        </>
    )
}