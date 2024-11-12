import React, { useState } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";
import Button from "../../part/Button";

export default function Read({onChangePage}) {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);
   
    // Menambahkan data menjadi 10 item dengan URL gambar
    const data = [
        { Key: 1, JudulBerita: "Tentang BPM", Tanggal: "27/11/2024", Foto: "https://www.polytechnic.astra.ac.id/storage/2024/04/mahasiswa-4-Kontribusi-kepada-bangsa.png" },
        { Key: 2, JudulBerita: "Berita A", Tanggal: "26/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 3, JudulBerita: "Berita B", Tanggal: "25/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 4, JudulBerita: "Berita C", Tanggal: "24/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 5, JudulBerita: "Berita D", Tanggal: "23/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 6, JudulBerita: "Berita E", Tanggal: "22/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 7, JudulBerita: "Berita F", Tanggal: "21/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 8, JudulBerita: "Berita G", Tanggal: "20/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 9, JudulBerita: "Berita H", Tanggal: "19/11/2024", Foto: "https://via.placeholder.com/100" },
        { Key: 10, JudulBerita: "Berita I", Tanggal: "18/11/2024", Foto: "https://via.placeholder.com/100" }
    ];

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    const title = "Kelola Berita";
    const breadcrumbs = [
        { label: "Berita", href: "/berita" },
        { label: "Kelola Berita" },
    ];

    const handleEdit = (item) => {
        onChangePage("edit", { state: { editData: item } });
    }; 


    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 p-3" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        <PageTitleNav 
                            title={title} 
                            breadcrumbs={breadcrumbs} 
                            onClick={() => onChangePage("index")}
                        />
                    </div>
                    <div className="p-3 m-5 mt-2 mb-0" style={{ marginLeft: '50px' }}>
                        <Button 
                            iconName="add"
                            classType="primary"
                            label="Tambah Data"
                            onClick={() => onChangePage("add")}
                        />
                    </div>
                    <div className="table-container bg-white p-3 m-5 mt-0 rounded">
                        <Table
                            arrHeader={["No", "Judul Berita", "Tanggal", "Foto"]}
                            headerToDataMap={{
                                "No": "No",
                                "Judul Berita": "JudulBerita",
                                "Tanggal": "Tanggal",
                                "Foto": "Foto"
                            }}
                            data={currentData.map((item, index) => ({
                                key: item.Key || index,
                                No: indexOfFirstData + index + 1,
                                JudulBerita: item.JudulBerita,
                                Tanggal: item.Tanggal,
                                Foto: <img src={item.Foto} alt="Foto Berita" width="100" height="100" />
                            }))}
                            actions={["Detail", "Edit", "UpdateHistory"]}
                            onEdit={handleEdit}
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
