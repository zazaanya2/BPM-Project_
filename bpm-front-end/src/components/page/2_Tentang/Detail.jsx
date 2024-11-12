import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTitleNav from "../../part/PageTitleNav"; 
import TextArea from "../../part/TextArea"; 
import HeaderForm from "../../part/HeaderText"; 
import Button from "../../part/Button";
import DetailData from "../../part/DetailData"; 

export default function Edit({ onChangePage }) {
    const location = useLocation();

    const data = [
        { Key: 1, Kategori: "Tentang BPM", Isi: "Badan Penjamin Mutu (BPM) melaksanakan proses penetapan dan pemenuhan standar mutu pengelolaan Politeknik Astra secara berkelanjutan guna menjaga dan meningkatkan mutu penyelenggaraan program pendidikan dan kegiatan akademik di Politeknik Astra, dalam mewujudkan visi dan misi institusi, serta memenuhi kebutuhan stakeholders" },
        { Key: 2, Kategori: "Sejarah BPM", Isi: "Ani - Bandung" },
        { Key: 3, Kategori: "Sasaran BPM", Isi: "Cici - Surabaya" },
        { Key: 4, Kategori: "Strategi BPM", Isi: "Dodi - Medan" },
        { Key: 5, Kategori: "Visi", Isi: "Eka - Semarang" },
        { Key: 6, Kategori: "Misi", Isi: "Feri - Malang" },
        { Key: 7, Kategori: "Struktur BPM", Isi: "Gina - Yogyakarta" },
        { Key: 8, Kategori: "SK Pendirian", Isi: "Hani - Solo" },
    ];

    const [formData, setFormData] = useState({
        Kategori: "",
        Isi: "",
    });

    // Fetch data matching `idData` ID from location.state
    useEffect(() => {
        if (location.state?.idData) {
            const editId = location.state.idData;
            const selectedData = data.find(item => item.Key === editId);
            if (selectedData) {
                setFormData({
                    Kategori: selectedData.Kategori,
                    Isi: selectedData.Isi,
                });
            }
        }
    }, [location.state?.idData]);
    

    const handleSave = () => {
        // Implementasi fungsi simpan
        onChangePage("read");
    };

    const handleCancel = () => {
        onChangePage("read");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 p-3" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        <PageTitleNav 
                            title="Detail Tentang"
                            breadcrumbs={[
                                { label: "Tentang", href: "/tentang" }, 
                                { label: "Kelola Tentang", href: "/tentang/kelola" }, 
                                { label: "Detail Tentang" }
                            ]}
                            onClick={() => onChangePage("read")}
                        />
                    </div>
                    
                    <div className="shadow p-5 m-5 mt-4 bg-white rounded">
                        <HeaderForm label="Formulir Tentang"/>    
                        <DetailData label="Kategori" isi={formData.Kategori} />
                        <DetailData label="Isi" isi={formData.Isi}/>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 ">
                                <DetailData label="Dibuat Oleh" isi="Retno Widiastuti"/>
                                <DetailData label="Dibuat Tanggal" isi="5 Januari 2005"/>
                            </div>
                            <div className="col-lg-6 col-md-6 ">
                                <DetailData label="Dimodifikasi Oleh" isi="Retno Widiastuti"/>
                                <DetailData label="Dimodifikasi Tanggal" isi="5 Januari 2005"/>
                            </div>
                        </div>    
                        
                        
                    </div>
                </div>
            </main>
        </div>
    );
}
