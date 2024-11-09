import React, { useState } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";
import Button from "../../part/Button";
import { useNavigate } from "react-router-dom";

export default function Read() {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);
    const navigate = useNavigate(); // Hook for navigation

    const data = [
        { Key: 1, Nama: "Tentang BPM", Email: "budi@example.com", Alamat: "Jakarta" },
        { Key: 2, Nama: "Sejarah BPM", Email: "ani@example.com", Alamat: "Bandung" },
        { Key: 3, Nama: "Sasaran BPM", Email: "cici@example.com", Alamat: "Surabaya" },
        { Key: 4, Nama: "Strategi BPM", Email: "dodi@example.com", Alamat: "Medan" },
        { Key: 5, Nama: "Visi", Email: "eka@example.com", Alamat: "Semarang" },
        { Key: 6, Nama: "Misi", Email: "feri@example.com", Alamat: "Malang" },
        { Key: 7, Nama: "Struktur BPM", Email: "gina@example.com", Alamat: "Yogyakarta" },
        { Key: 8, Nama: "SK Pendirian", Email: "hani@example.com", Alamat: "Solo" },
    ];

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    const title = "Kelola Tentang";
    const breadcrumbs = [
        { label: "Tentang", href: "/tentang" },
        { label: "Kelola Tentang" },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        <PageTitleNav 
                            title={title} 
                            breadcrumbs={breadcrumbs} 
                            onClick={() => navigate("/tentang")}
                        />
                    </div>
                    <div className="table-container bg-white p-3 m-5 mt-0 rounded">
                        <Table
                            arrHeader={["Nama", "Email", "Alamat"]}
                            headerToDataMap={{
                                "Nama" : "Nama",
                                "Email" : "Email",
                                "Alamat" : "Alamat"
                            }}
                            data={currentData}
                            actions={["Detail", "Edit", "UpdateHistory"]}
                            onDetail={(id) => console.log("Detail", id)}
                            onEdit={(id) => navigate(`/editTentang/${id}`)} // Navigate to Edit page with ID
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
