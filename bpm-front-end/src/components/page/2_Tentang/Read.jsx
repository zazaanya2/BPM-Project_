import React, { useState } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";

export default function Read({ onChangePage }) {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);

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

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    
    

    // Fungsi untuk membatasi karakter teks di kolom Isi
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        <PageTitleNav 
                            title="Kelola Tentang" 
                            breadcrumbs={[{ label: "Tentang", href: "/tentang" }, { label: "Kelola Tentang" }]}
                            onClick={() => onChangePage("index")}
                        />
                    </div>
                    
                    <div className="table-container bg-white p-3 m-5 mt-0 rounded">
                        <Table
                            arrHeader={["No", "Kategori"]}
                            headerToDataMap={{
                                "No": "No",
                                "Kategori" : "Kategori",
                                
                            }}
                            data={currentData.map((item, index) => ({
                                Key: item.Key || index,
                                No: indexOfFirstData + index + 1,
                                Kategori : item.Kategori,

                            }))}
                            actions={["Detail", "Edit"]}
                            onEdit={(item) => onChangePage("edit", { state: { idData: item } })}
                            onDetail={(item) => onChangePage("detail", { state: { idData: item } })}
                            
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
