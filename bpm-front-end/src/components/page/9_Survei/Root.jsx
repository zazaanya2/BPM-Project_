import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KriteriaSurvei from './Kriteria_Survei/Index';
import SkalaPenilaian from './Skala_Penilaian/Index'

export default function Survei(){
    return(
        <>
            <Routes>
                <Route path="/survei/kriteria" element={<KriteriaSurvei />} />
                <Route path="/survei/skala" element={<SkalaPenilaian />} />
            </Routes>
        </>
    )
}