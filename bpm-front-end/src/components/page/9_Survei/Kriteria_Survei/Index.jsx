import React, { useState, useRef } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import Button from "../../../part/Button";
import TextField from "../../../part/TextField"
import Modal from "../../../part/Modal";
import SearchField from "../../../part/SearchField"
import { useNavigate } from "react-router-dom";

export default function Index() {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);
    const navigate = useNavigate(); // Hook for navigation
    const addModalRef = useRef();
    const updateModalRef = useRef();
    const [events, setEvents] = useState([
        // Example event data, replace this with actual data
        { id: 1, Nama: 'Dosen'},
        { id: 2, Nama: 'Tenaga Pendidik'},
        { id: 3, Nama: 'Mahasiswa'}
    ]);
    const handleAddEvent = () => {
        const newEvent = {
            id: events.length + 1,
            Nama: formData.name,
        };
        setEvents([...events, newEvent]);
        setFormData({ nama: ''});
        addModalRef.current.close();
    };

    const handleUpdateEvent = () => {
        const updatedEvent = {
            ...selectedEvent,
            id: events.length + 1,
            Nama: formData.name,
        };
        setEvents(events.map(event => event.id === selectedEvent.id ? updatedEvent : event));
        setSelectedEvent(null);
        updateModalRef.current.close();
    };
        // Menambahkan data menjadi 10 item dengan URL gambar
        const data = [
            { Key: 1, Nama: "Dosen"},
            { Key: 2, Nama: "Mahasiswa" },
            { Key: 3, Nama: "Mahasiswa" },
            { Key: 4, Nama: "Mahasiswa" },
            { Key: 5, Nama: "Mahasiswa" },
            { Key: 6, Nama: "Mahasiswa" },
            { Key: 7, Nama: "Mahasiswa" },
            { Key: 8, Nama: "Mahasiswa" },
            { Key: 9, Nama: "Mahasiswa" },
            { Key: 10,Nama: "Mahasiswa" }
        ];
        const handleSelectEvent = (event) => {
            setSelectedEvent(event);
            setFormData({
                name: event.title,
            });
        };    
    

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    const title = "Kriteria Survei";
    const breadcrumbs = [
        { label: "Kriteria Survei" },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1" style={{ marginTop: '80px' }}>
                <div className="d-flex flex-column">
                    <div className="m-3 mb-0">
                        <PageTitleNav 
                            title={title} 
                            breadcrumbs={breadcrumbs} 
                            onClick={() => navigate("/beranda")}
                        />
                    </div>
                    <div className="p-3 m-5 mt-2 mb-0" style={{ marginLeft: '50px' }}>
                                        
                    <Button iconName="add" classType="primary" label="Tambah Kriteria Survei" onClick={() => addModalRef.current.open()} />
                    <div className="row mt-5 ">
                        <div className="col-lg-10 col-md-6 ">
                            <SearchField ></SearchField>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <Button 
                                iconName="settings-sliders" 
                                classType="primary" 
                                label="Filter" 
                                onClick={() => addModalRef.current.open()} />
                    
                        </div>
                    </div>
                    
                    </div>
                    <div className="table-container bg-white p-3 m-5 mt-0 rounded">
                        <Table
                            arrHeader={["No", "Nama Kriteria Survei"]}
                            headerToDataMap={{
                                "No": "No",
                                "Nama Kriteria Survei": "Nama",
                            }}
                            data={currentData.map((item, index) => ({
                                key: item.Key || index,
                                No: indexOfFirstData + index + 1,
                                Nama: item.Nama 
                            }))}
                            actions={["Detail", "Edit"]}
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
            {/* Add Event Modal */}
            <Modal
                ref={addModalRef}
                title="Tambah Kriteria Survei"
                size="full"
                Button1={<Button classType="primary" label="Simpan" onClick={handleAddEvent} />}
            >
                <form>
                    <TextField label="Kriteria Survei" isRequired="true"></TextField>
                </form>
            </Modal>
            {/* Update Event Modal */}
            <Modal
                ref={updateModalRef}
                title="Update Rencana"
                size="medium"
                Button1={<Button label="Update" onClick={handleUpdateEvent} />}
            >
                <form>
                    <TextField label></TextField>
                </form>
            </Modal>
        </div>
    );
}
