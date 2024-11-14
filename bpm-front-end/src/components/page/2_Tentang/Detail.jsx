import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns"; // Import format from date-fns
import { id } from "date-fns/locale"; // Import Indonesian locale
import PageTitleNav from "../../part/PageTitleNav"; 
import HeaderForm from "../../part/HeaderText"; 
import DetailData from "../../part/DetailData"; 
import { API_LINK, FILE_LINK } from "../../util/Constants";
import Loading from "../../part/Loading";


export default function Detail({ onChangePage }) {
    const location = useLocation();

    const [formData, setFormData] = useState({
        Kategori: "",
        Isi: "",
        Createby: "",
        CreateDate: "",
        Modifby: "",
        ModifDate: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state?.idData) {
            const editId = location.state.idData;
            fetch(API_LINK + `/api/MasterTentang/GetDataTentangById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ten_id: editId }),
            })
            .then(response => response.json())
            .then(data => {
                if (data && data[0]) {
                    setFormData({
                        Kategori: data[0].ten_category,
                        Isi: data[0].ten_isi,
                        Createby: data[0].ten_created_by,
                        CreateDate: format(new Date(data[0].ten_created_date), 'EEEE, dd MMMM yyyy', { locale: id }),
                        Modifby: data[0].ten_modif_by,
                        ModifDate: format(new Date(data[0].ten_modif_date), 'EEEE, dd MMMM yyyy', { locale: id }),
                    });
                } else {
                    console.error("Data not found or format mismatch.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
            .finally(() => setLoading(false));
        }
    }, [location.state?.idData]);

    if (loading) {
        return <Loading />;
    }

    // Render photo or file based on the content type
    const renderContent = () => {
        const id = location.state?.idData;
        const baseURL = FILE_LINK;
    
        if (id === 7) {
            return  <div>
                        <label htmlFor={id} className="form-label fw-bold">Foto Struktur</label> 
                        <img src={`${baseURL}${formData.Isi}`} alt="Uploaded" className="img-fluid mb-3" />
                    </div>
            
        } else if (id === 8) {
            return (
                <div className="mb-3">
                    
                    <label htmlFor={id} className="form-label fw-bold">File SK</label> <br></br>
                    <a href={`${baseURL}${formData.Isi}`} target="_blank" rel="noopener noreferrer">
                        Lihat Pratinjau
                    </a>
                </div>
                
            );
        } else {
            return <DetailData label="Isi" isi={formData.Isi} />;
        }
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
                        
                        {renderContent()}

                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <DetailData label="Dibuat Oleh" isi={formData.Createby}/>
                                <DetailData label="Dibuat Tanggal" isi={formData.CreateDate}/>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <DetailData label="Dimodifikasi Oleh" isi={formData.Modifby}/>
                                <DetailData label="Dimodifikasi Tanggal" isi={formData.ModifDate}/>
                            </div>
                        </div>    
                    </div>
                </div>
            </main>
        </div>
    );
}
