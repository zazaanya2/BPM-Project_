import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageTitleNav from "../../part/PageTitleNav"; 
import TextField from "../../part/TextField"; 
import TextArea from "../../part/TextArea"; 
import DatePicker from "../../part/DatePicker"; 
import HeaderForm from "../../part/HeaderForm"; 
import Button from "../../part/Button";
import DetailData from "../../part/DetailData"; 

export default function Edit() {
    const { id } = useParams(); // Retrieve the ID from the URL
    const navigate = useNavigate();

    const title = "Edit Tentang";
    const breadcrumbs = [
        { label: "Tentang", href: "/tentang" }, 
        { label: "Kelola Tentang", href: "/kelolaTentang" }, 
        { label: "Edit Tentang" } 
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
     
      <main className="flex-grow-1" style={{ marginTop: '80px' }}>
        <div className="d-flex flex-column">
          {/* Breadcrumbs and Page Title */}
            <div className="m-3">
                <PageTitleNav 
                    title={title}
                    breadcrumbs={breadcrumbs}
                    onClick={() => navigate("/kelolaTentang")} // Corrected usage
                />
            </div>


          {/* Main Content Section */}
          <div className="shadow p-5 m-5 mt-0 bg-white rounded">
            <HeaderForm label="Formulir Tentang"/>
            <div className="row">
                <TextField label="Nama" isRequired="true" />
                <DetailData label="Dibuat Oleh" isi="Retno Widiastuti"/>
            </div>
            
            <TextArea label="Deskripsi"/>

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
