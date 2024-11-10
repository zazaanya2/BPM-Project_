import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../part/Button";
import HeaderText from "../../part/HeaderText";
import Gedung from "../../../assets/element/gedung-astra-biru.png";
import Mahasiswa from "../../../assets/element/mahasiswa.png";
import SearchField from "../../part/SearchField";
import CardBerita from "../../part/CardBerita";
import Paging from "../../part/Paging";


export default function Index() {
  const navigate = useNavigate();
  const [pageCurrent, setPageCurrent] = useState(1);
  const pageSize = 2; // Display 2 items per page

  const beritaData = [
    {
      title: "Pelaksanaan AMI Departemen Kemahasiswaan dan Alumni",
      author: "Retno Widiastuti",
      date: "12 Jun 2024",
      description: "Sesuai Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi, di mana setiap perguruan tinggi harus mengimplementasikan SPMI Sesuai Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi, di mana setiap perguruan tinggi harus mengimplementasikan SPMI",
      images: [
        "https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ]
    },
    {
      title: "Workshop Penjaminan Mutu Internal",
      author: "Andi Surya",
      date: "5 Jul 2024",
      description: "Sesuai Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi, di mana setiap perguruan tinggi harus mengimplementasikan SPMI...",
      images: [
        "https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg"
      ]
    },
    {
      title: "Rapat Koordinasi BPM Politeknik Astra",
      author: "Siti Nurhaliza",
      date: "15 Agu 2024",
      description: "Sesuai Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi, di mana setiap perguruan tinggi harus mengimplementasikan SPMI...",
      images: [
        "https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ]
    },
    {
      title: "Evaluasi dan Pengembangan SPMI",
      author: "Budi Santoso",
      date: "20 Sep 2024",
      description: "Sesuai Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi, di mana setiap perguruan tinggi harus mengimplementasikan SPMI...",
      images: [
        "https://i.pinimg.com/564x/71/cf/08/71cf0817e3beafe5da5651283a988cb3.jpg",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ]
    }
  ];

  const totalData = beritaData.length;
  const startIndex = (pageCurrent - 1) * pageSize;
  const currentData = beritaData.slice(startIndex, startIndex + pageSize);

  const handleClick = () => {
    navigate("/kelolaBerita");
  };

  const handleDetailClick = (newsItem) => {
    navigate("/lihatBerita", { state: newsItem });
  };

  return (
    <>
      <div
        className="bg-image position-relative"
        style={{
          backgroundImage: `url(${Gedung})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          
        }}
      >
        <div className="position-absolute top-0 end-0 p-5 m-5" style={{ zIndex: 1 }}>
          <Button
            classType="btn btn-primary"
            title="Kelola Berita"
            label="Kelola Berita"
            onClick={handleClick}
          />
        </div>


        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="position-absolute top-3 start-0 p-5 m-5" style={{ top: '10%' }} >
              <HeaderText
                label={<>Berita Badan<br />Penjamin Mutu (BPM)<br />Politeknik Astra</>}
                warna="white"
                alignText="left"
                fontWeight="700"
                lebar="310px"
                ukuran="200%"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-6">
            <img
              src={Mahasiswa}
              alt="Orang"
              style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: '75%',
                height: 'auto',
                minWidth: '700px',
                paddingRight: '20px',
                maxWidth:'75%'
              }}
            />
          </div>
        </div>
      </div>

      <div className="shadow p-5 m-5 bg-white rounded-5"
        style={{
          position: 'relative',
          top: '-220px',
          zIndex: '1',
          height: '100%',
          
        }}
      >
        <div className="row">
          <div className="col-lg-9 col-md-6">
            <SearchField />
          </div>
        </div>

        <div className="row mt-4">
          {currentData.map((newsItem, index) => (
            
            <CardBerita
              title={newsItem.title}
              author={newsItem.author}
              date={newsItem.date}
              description={newsItem.description}
              image={newsItem.images[0]}
              size="large"
              onClick={() => handleDetailClick(newsItem)}
            />
          ))}
        </div>

        <Paging
          pageSize={pageSize}
          pageCurrent={pageCurrent}
          totalData={totalData}
          navigation={(page) => setPageCurrent(page)}
        />
      </div>

      <div>
      
      </div>
    </>
  );
}
