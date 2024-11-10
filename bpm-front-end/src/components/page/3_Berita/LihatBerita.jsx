import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderText from '../../part/HeaderText';
import PageTitleNav from '../../part/PageTitleNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import SliderBerita from '../../part/SliderBerita';
import ScrollToTop from '../../part/ScrollToTop';

const LihatBerita = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data berita
  const beritaData = [
    {
      title: "Pelaksanaan AMI Departemen Kemahasiswaan dan Alumni",
      author: "Retno Widiastuti",
      date: "12 Jun 2024",
      description: "Sesuai Peraturan Menteri Pendidikan...",
      images: ["https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg"]
    },
    {
      title: "Workshop Penjaminan Mutu Internal",
      author: "Andi Surya",
      date: "5 Jul 2024",
      description: "Sesuai Peraturan Menteri Pendidikan...",
      images: ["https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg"]
    },
    {
      title: "Rapat Koordinasi BPM Politeknik Astra",
      author: "Siti Nurhaliza",
      date: "15 Agu 2024",
      description: "Sesuai Peraturan Menteri Pendidikan...",
      images: ["https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg"]
    },
    {
      title: "Evaluasi dan Pengembangan SPMI",
      author: "Budi Santoso",
      date: "20 Sep 2024",
      description: "Sesuai Peraturan Menteri Pendidikan...",
      images: ["https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg"]
    }
  ];

  // Data berita yang sedang dilihat
  const {
    title = "Judul Tidak Tersedia",
    author = "Penulis Tidak Diketahui",
    date = "Tanggal Tidak Tersedia",
    description = "Deskripsi Tidak Tersedia",
    images = []
  } = location.state || {};

  // Filter beritaData agar tidak menampilkan berita yang sedang dilihat
  const filteredBeritaData = beritaData.filter(berita => berita.title !== title);

  return (
    <div>
    
      <div className="position-relative">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner" style={{ height: '600px' }}>
            {images.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={index}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '600px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 40%, transparent 70%, rgba(0, 0, 0, 0.9))',
                  }}
                ></div>
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}

          <div className="position-absolute top-0 start-0 p-5 m-5 ms-0" style={{ zIndex: 1 }}>
            <PageTitleNav 
              title="Baca Berita"
              onClick={() => navigate("/berita")} 
              color="white"
            />
          </div>

          <div className="position-absolute bottom-0 start-0 ps-5 m-4">
            <HeaderText
              label={title}
              warna="white"
              alignText="left"
              fontWeight="700"
              lebar="310px"
              marginBottom="10px"
            />
            <p className="text-white">
              Oleh {author} Tanggal {date}
            </p>
          </div>
        </div>
      </div>

      <div className="m-5 p-3 bg-white rounded-3">
        <p>{description}</p>
      </div>

      <div>
        <HeaderText
              label="Berita Lainnya"
              warna="#2654A1"
              alignText="center"
              fontWeight="650"
              lebar="310px"
              marginBottom="30px"
            />
        {/* Kirim data yang sudah difilter ke SliderBerita */}
        <SliderBerita beritaItems={filteredBeritaData}/>
      </div>


    
      
    </div>
  );
};

export default LihatBerita;
