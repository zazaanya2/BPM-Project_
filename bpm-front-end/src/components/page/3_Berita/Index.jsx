import { useState, useEffect } from "react";
import Button from "../../part/Button";
import HeaderText from "../../part/HeaderText";
import Gedung from "../../../assets/element/gedung-astra-biru.png";
import Mahasiswa from "../../../assets/element/mahasiswa.png";
import SearchField from "../../part/SearchField";
import CardBerita from "../../part/CardBerita";
import Paging from "../../part/Paging";
import Loading from "../../part/Loading"; 
import { API_LINK, BERITAFOTO_LINK} from "../../util/Constants";
import { format } from "date-fns"; // Import format from date-fns
import { id } from "date-fns/locale";
import { useIsMobile } from "../../util/useIsMobile";

export default function Index({ onChangePage }) {
  const [beritaData, setBeritaData] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const pageSize = 2;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_LINK}/api/MasterBerita/GetDataBerita`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ /* Request body jika diperlukan */ }),
        });

        if (!response.ok) throw new Error("Gagal mengambil data");

        const result = await response.json();
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

        
        const formattedData = Object.values(groupedBerita);
        setBeritaData(formattedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalData = beritaData.length;
  const startIndex = (pageCurrent - 1) * pageSize;
  const currentData = beritaData.slice(startIndex, startIndex + pageSize);

  const handleDetailClick = (newsItem) => {
    onChangePage("news", { state: newsItem });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

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
            onClick={() => onChangePage("read")}
          />
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="position-absolute top-3 start-0" style={{ top: '10%', padding: isMobile ? "2rem" : "3rem", margin: isMobile ? "1rem" : "3rem", }}>
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
                right: isMobile? '0':'0',
                bottom: isMobile?'65px':'0',
                width: '75%',
                height: 'auto',
                minWidth: '700px',
                paddingRight: '20px',
                maxWidth: '75%',
              }}
            />
          </div>
        </div>
      </div>

      <div className="shadow bg-white rounded-5 "
        style={{
          position: 'relative',
          top: '-210px',
          zIndex: '1',
          height: '100%',
          padding: isMobile ? "2rem" : "3rem", // Padding lebih kecil di mobile
          margin: isMobile ? "1rem" : "4rem",
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
              key={index}
              title={newsItem.title}
              author={newsItem.author}
              date={newsItem.date}
              description={newsItem.description}
              image={BERITAFOTO_LINK+newsItem.images[0]}  // Menampilkan gambar pertama jika ada
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
    </>
  );
}
