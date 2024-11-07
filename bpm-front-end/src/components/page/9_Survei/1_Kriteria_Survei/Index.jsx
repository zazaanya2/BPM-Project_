import React, { useState } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import Button from "../../../part/Button";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);
    const navigate = useNavigate(); // Hook for navigation

    
    const title = "Kriteria Survei";
    // const breadcrumbs = [
    //     { label: "Kriteria Survei", href: "/survei/kriteria"
    //     }
    // ];
    
    const data = [
        { Key: 1,No:"", Nama: "Tentang BPM"},
        { Key: 2,No:"", Nama: "Sejarah BPM"},
        { Key: 3,No:"", Nama: "Sasaran BPM"},
        { Key: 4,No:"", Nama: "Strategi BPM"},
        { Key: 5,No:"", Nama: "Visi"},
        { Key: 6,No:"", Nama: "Misi"},
        { Key: 7,No:"", Nama: "Struktur BPM"},
        { Key: 8,No:"", Nama: "SK Pendirian"},
    ];

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        {/* <PageTitleNav 
                            title={title} 
                        />   */}
                    </div>
                    <div className="  p-3 m-5 mt-2 mb-0" style={{ marginLeft: '50px' }}>
                        <Button 
                            iconName="add"
                            classType="primary"
                            label="Tambah Data"
                            onClick={() => navigate("/tambahBerita")}
                        />
                    </div>
                    <div className="table-container bg-white p-3 m-5 mt-0 rounded">
                        <Table
                            arrHeader={["No","Nama Kriteria Survei"]}
                            data={currentData}
                            actions={["Detail", "Edit"]}
                            onDetail={(id) => console.log("Detail", id)}
                            onEdit={(id) => navigate(`/edit/${id}`)} // Navigate to Edit page with ID
                            onUpdateHistory={(id) => console.log("Update History", id)}
                        />
                        <Paging
                            pageSize={pageSize}
                            pageCurrent={pageCurrent}
                            totalData={data.length}
                            navigation={handlePageNavigation}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
