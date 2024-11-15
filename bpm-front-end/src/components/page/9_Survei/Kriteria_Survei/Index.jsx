import React, { useState, useRef } from "react";
import Table from "../../../part/Table";
import Paging from "../../../part/Paging";
import PageTitleNav from "../../../part/PageTitleNav";
import Button from "../../../part/Button";
import TextField from "../../../part/TextField";
import Modal from "../../../part/Modal";
import Filter from "../../../part/Filter";
import SearchField from "../../../part/SearchField";
import FileUpload from "../../../part/FileUpload";
import DropDown from "../../../part/Dropdown";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const [pageSize] = useState(10);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [selectedkriteria, setSelectedkriteria] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const addModalRef = useRef();
    const updateModalRef = useRef();
    const detailModalRef = useRef();
    const navigate = useNavigate();

    const dataOptions = [
        { Value: "1", Text: "Pria" },
        { Value: "2", Text: "Wanita" },
        { Value: "3", Text: "Tidak Ingin Disebutkan" },
    ];

    const [kriteria, setkriteria] = useState([
        { id: 1, Nama: 'Dosen' },
        { id: 2, Nama: 'Tenaga Pendidik' },
        { id: 3, Nama: 'Mahasiswa' }
    ]);

    const handleAddkriteria = () => {
        const newkriteria = {
            id: kriteria.length + 1,
            Nama: formData.name,
        };
        setkriteria([...kriteria, newkriteria]);
        setFormData({ name: '' });
        addModalRef.current.close();
    };

    const handleUpdatekriteria = () => {
        if (!selectedkriteria) return; // Check if selectedkriteria is set
        const updatedkriteria = {
            ...selectedkriteria,
            Nama: formData.name,
        };
        setkriteria(kriteria.map(kriteria => kriteria.id === selectedkriteria.id ? updatedkriteria : kriteria));
        setSelectedkriteria(null);
        setFormData({ name: '' }); // Reset form data
        updateModalRef.current.close();
    };

    const handleSelectkriteria = (kriteria) => {
        setSelectedkriteria(kriteria);
        setFormData({
            name: kriteria.Nama,
        });
        updateModalRef.current.open();
    };

    const handleDetailkriteria = (kriteria) => {
        setSelectedkriteria(kriteria);
        detailModalRef.current.open();
    };

    const indexOfLastData = pageCurrent * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = kriteria.slice(indexOfFirstData, indexOfLastData);

    const handlePageNavigation = (page) => {
        setPageCurrent(page);
    };

    const title = "Kriteria Survei";
    const breadcrumbs = [{ label: "Kriteria Survei" }];

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
                                <SearchField />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <Filter />
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
                                key: item.id,
                                No: indexOfFirstData + index + 1,
                                Nama: item.Nama
                            }))}
                            actions={["Detail", "Edit", "Surveyor", "Responden"]}
                            onDetail={handleDetailkriteria}
                            onEdit={handleSelectkriteria}
                        />
                        <Paging
                            pageSize={pageSize}
                            pageCurrent={pageCurrent}
                            totalData={kriteria.length}
                            navigation={handlePageNavigation}
                        />
                    </div>
                </div>
            </main>

            {/* ADD MODAL */}
            <Modal
                ref={addModalRef}
                title="Tambah Kriteria Survei"
                size="full"
                Button1={<Button classType="primary" label="Simpan" onClick={handleAddkriteria} />}
            >
                <TextField label="Kriteria Survei" isRequired={true} onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
                <FileUpload />
                <DropDown label="Jenis Kelamin" type="pilih" arrData={dataOptions} />
            </Modal>

            {/* EDIT MODAL */}
            <Modal
                ref={updateModalRef}
                title="Update Kriteria Survei"
                size="medium"
                Button1={<Button label="Update" onClick={handleUpdatekriteria} />}
            >
                <TextField label="Kriteria Survei" isRequired={true} onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
            </Modal>

            {/* DETAIL MODAL */}
            <Modal
                ref={detailModalRef}
                title="Detail Kriteria Survei"
                size="medium"
                Button1={<Button classType="secondary" label="Tutup" onClick={() => detailModalRef.current.close()} />}
            >
                <label htmlFor="" className="fw-bold">Nama Kriteria Survei</label>
                <br />
                <p>{selectedkriteria ? selectedkriteria.Nama : "Data tidak tersedia"}</p>
            </Modal>
        </div>
    );
}
