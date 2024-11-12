import React, { useState } from "react"; 
import PageTitleNav from "../../part/PageTitleNav"; 
import TextField from "../../part/TextField"; 
import TextArea from "../../part/TextArea"; 
import DatePicker from "../../part/DatePicker"; 
import UploadFoto from "../../part/UploadFotoMulti"; 
import HeaderForm from "../../part/HeaderText"; 
import Button from "../../part/Button";
import DetailData from "../../part/DetailData"; 
import { useLocation } from "react-router-dom";

export default function Edit({onChangePage}) {
    const location = useLocation();

    const title = "Edit Berita";
    const breadcrumbs = [
        { label: "Berita", href: "/berita" }, 
        { label: "Kelola Berita", href: "/berita/kelola" }, 
        { label: "Edit Berita" } 
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
     
      <main className="flex-grow-1 p-3" style={{ marginTop: '80px' }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
            <div className="m-3">
                <PageTitleNav 
                    title={title}
                    breadcrumbs={breadcrumbs}
                    onClick={() => onChangePage("read")} // Corrected usage
                />
            </div>


          {/* Main Content Section */}
          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
            <HeaderForm label="Formulir Berita"/>
            <div className="row">
              <div className="col-lg-6 col-md-6 ">
                <TextField label="Judul Berita" isRequired="true" />
                <DetailData label="Penulis" isi="Retno Widiastuti"/>
              </div>
              <div className="col-lg-6 col-md-6">
                <DatePicker label="Tanggal"/>
              </div>
            </div>
            
            <TextArea label="Isi Berita"/>

            <div className="row">
              <UploadFoto label="Masukkan Foto"/>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 m-2">
                <Button classType="primary" type="submit" label="Simpan" width="100%" />
              </div>
              <div className="flex-grow-1 m-2">
                <Button classType="danger" type="button" label="Batal" width="100%" />
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
    );
}
