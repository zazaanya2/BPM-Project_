import React, { useState, useEffect } from "react";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import PageTitleNav from "../../part/PageTitleNav";
import Button from "../../part/Button";
import { API_LINK, BERITAFOTO_LINK } from "../../util/Constants";
import Loading from "../../part/Loading";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useIsMobile } from "../../util/useIsMobile";

export default function Read({ onChangePage }) {
    const [pageSize] = useState(10);
    const isMobile = useIsMobile();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await fetch(`${API_LINK}/api/MasterBerita/GetDataBerita`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Gagal mengambil data');

                const result = await response.json();

                // Mengelompokkan data berita berdasarkan ber_id, jika ada lebih dari 1 foto
                const groupedBerita = result.reduce((acc, item) => {
                    if (!acc[item.ber_id]) {
                        acc[item.ber_id] = {
                            id: item.ber_id,
                            title: item.ber_judul,
                            date: format(new Date(item.ber_tgl), 'EEEE, dd MMMM yyyy', { locale: id }),
                            description: item.ber_isi,
                            author: item.ber_created_by,
                            images: [],
                        };
                    }
                    if (item.dbr_foto) {
                        acc[item.ber_id].images.push(item.dbr_foto);
                    }
                    
                    return acc;
                }, {});

                setData(Object.values(groupedBerita)); // Set data here
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Gagal mengambil data');
            } finally {
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

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


    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 p-3" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className= {isMobile? "m-0 p-0" :"m-3 mb-0"}>
                        <PageTitleNav
                            title={title}
                            breadcrumbs={breadcrumbs}
                            onClick={() => onChangePage("index")}
                        />
                    </div>
                    <div className={isMobile?"p-2 m-2 mt-2 mb-0":"p-3 m-5 mt-2 mb-0"} style={{ marginLeft: '50px' }}>
                        <Button
                            iconName="add"
                            classType="primary"
                            label="Tambah Data"
                            onClick={() => onChangePage("add")}
                        />
                    </div>
                    <div className={isMobile? "table-container bg-white p-2 m-2 mt-0 rounded":"table-container bg-white p-3 m-5 mt-0 rounded"}>
                        <Table
                            arrHeader={["No", "Judul Berita", "Tanggal", "Foto"]}
                            headerToDataMap={{
                                "No": "No",
                                "Judul Berita": "JudulBerita",
                                "Tanggal": "Tanggal",
                                "Foto": "Foto"
                            }}
                            data={currentData.map((item, index) => ({
                                Key: item.id,
                                No: indexOfFirstData + index + 1,
                                JudulBerita: item.title,
                                Tanggal: new Date(item.date).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }),
                                Foto: (
                                    <div>
                                        {item.images.length > 0 && (
                                            <img 
                                                src={BERITAFOTO_LINK+item.images[0]}
                                                alt={`Foto Berita 1`} 
                                                width="100" 
                                                height="100" 
                                            />
                                        )}
                                    </div>
                                )
                                
                                
                            } ))}
                            actions={["Detail", "Edit","Delete"]}
                            onEdit={(item) => {
                                console.log("State dari read", item);  
                                onChangePage("edit", { state: { idData: item } })
                            }}
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
