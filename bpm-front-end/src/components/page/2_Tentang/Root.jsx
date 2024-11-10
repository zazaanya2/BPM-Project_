import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index'
import Read from './Read';
import Edit from './Edit';
import ScrollToTop from '../../part/ScrollToTop';

export default function Tentang(){
    return(
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/tentang" element={<Index />} />
                <Route path="/kelolaTentang" element={<Read />} />
                <Route path="/editTentang/:id" element={<Edit />} />
            </Routes>
        </>
    )
}