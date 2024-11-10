import { useNavigate } from "react-router-dom";

import Orang from "../../../assets/element/orang.png";
import Logo from "../../../assets/bpm-logo.png";
import Bangunan from "../../../assets/element/bangunan.png";
import OrangLaptop from "../../../assets/element/orang-laptop.png"
import OrangKerja from "../../../assets/element/orang-kerja.png";
import StrukturBPM from "../../../assets/bpm-struktur.png"
import Mahasiswa from "../../../assets/element/mahasiswa.png"
import Gedung from "../../../assets/element/gedung-astra.png"

import Text from "../../part/Text";
import HeaderText from "../../part/HeaderText";
import Button from "../../part/Button";
import Icon from "../../part/Icon";

export default function Index() {
  const navigate = useNavigate();

  const data = [
    {
      Key: 1,
      Kategori: "Tentang",
      isi: "Badan Penjamin Mutu (BPM) melaksanakan proses penetapan dan pemenuhan standar mutu pengelolaan Politeknik Astra secara berkelanjutan guna menjaga dan meningkatkan mutu penyelenggaraan program pendidikan dan kegiatan akademik di Politeknik Astra, dalam mewujudkan visi dan misi institusi, serta memenuhi kebutuhan stakeholders."
    },
    {
      Key: 2,
      Kategori: "Sejarah",
      isi: (
        <div>
          <p>Badan Penjaminan Mutu Universitas Nasional didirikan pada tanggal 10 Maret 2008 sesuai Surat Keputusan Rektor Nomor: 33 Tahun 2008. Diawal pendiriannya, Badan Penjaminan Mutu Universitas Nasional memiliki dua bidang:</p>
          <ul>
            <li>Bidang Audit</li>
            <li>Bidang Standar</li>
          </ul>
          <p>Tugas pokok dan fungsi pertama adalah merencanakan pedoman mutu dan mengkoordinasikan pelaksanaannya serta bertanggung jawab kepada Rektor.</p>
          <p>Pada tahun 2009, kedua bidang tersebut disatukan menjadi tugas pokok dan fungsi Sekretaris Badan. Pada tahun yang sama, unit penjaminan mutu ditetapkan pada setiap unit kerja, baik akademik maupun non-akademik, sebagaimana tertuang dalam Surat Keputusan Rektor Nomor: 112 Tahun 2009.</p>
          <p>Seiring perkembangan penerapan sistem penjaminan mutu di lingkungan Universitas Nasional, pada tahun 2014 struktur organisasi Badan Penjaminan Mutu dikembangkan menjadi tiga bidang:</p>
          <ul>
            <li>Bidang Pengembangan Mutu</li>
            <li>Bidang Standar Mutu</li>
            <li>Bidang Administrasi dan Informasi</li>
          </ul>
        </div>
      )
    },
    {
      Key: 3,
      Kategori: "SK",
      isi: "SK Pendirian BPM dapat diakses dengan mengklik kolom di bawah ini:"
    },
    {
      Key: 4,
      Kategori: "Visi",
      isi: "Visi Politeknik Astra adalah menjadi bagian dari institusi pendidikan vokasi terdepan dalam menghasilkan lulusan berkompetensi dengan standar internasional dan mengembangkan teknologi terapan yang relevan dengan industri masa kini dan mendatang."
    },
    {
      Key: 5,
      Kategori: "Misi",
      isi: (
        <ul>
          <li>Menyediakan pendidikan vokasi berbasis teknologi yang memberikan nilai tambah untuk meningkatkan kesejahteraan masyarakat.</li>
          <li>Mempersiapkan institusi unggul untuk membentuk lulusan yang berkarakter, berkompetensi tinggi, dan memiliki daya saing global dalam memberikan kontribusi terbaik bagi masyarakat dan industri.</li>
          <li>Menjadi mitra dunia industri dalam menyediakan sumber daya manusia handal dan teknologi terapan yang bermanfaat untuk kemajuan industri.</li>
          <li>Menciptakan lingkungan kerja dan pembelajaran kreatif yang mendorong pencapaian prestasi akademis unggul.</li>
        </ul>
      )
    }
  ];
  

  const handleClick = () => {
    navigate("/kelolaTentang"); // Route ke kelolaTentang sesuai dengan definisi di App.js
  };

  return (
    <>
      <div className="latarGradasi mt-5">
        <div className="position-absolute top-0 end-0 p-5">
          <Button
            className="btn btn-primary"
            title="Kelola Tentang"
            label="Kelola Tentang"
            onClick={handleClick}
          />
        </div>

        <img 
          src={Bangunan} 
          alt="Bangunan" 
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            left: '0',
            zIndex: 1
          }} 
        />
        
        <img 
          src={Orang} 
          alt="Orang" 
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',      
            maxWidth: '33vw',    
            minWidth: '380px',  
            zIndex: 2
          }} 
        />



        <div 
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            margin: '1rem',
            padding: '2rem',
            minHeight: '100vh',
            width: '800px'
          }}
        >
          <img 
            src={Logo} 
            alt="Logo" 
            style={{
              width: '200px', 
              height: 'auto', 
              marginBottom: '25px'
            }} 
          />
          
          <Text 
            isi={data[0].isi} 
            alignText="center"
            ukuran="18px"
          />
        </div>
      </div>


      <div className="shadow p-5 m-5 bg-white rounded">
        <HeaderText
          label="Sejarah BPM"
          warna="#2654A1"
          alignText="left"
          fontWeight="700"
        />

        <div className="row align-items-center">
            
            <div className="col-lg-4 col-md-6">
              <img src={OrangLaptop} alt="Logo" style={{ width: '80%', height: 'auto', marginBottom: '25px' }} />
          
            </div>   
            <div className="col-lg-8 col-md-6 ">
            <Text 
                isi={data[1].isi} 
                alignText="justify"
                ukuran="16px"
                warna="grey"
              />
            </div>         
        </div>

        <div className="row ">
            <div className="col-lg-5 col-md-6 mt-5">
              <div className="shadow p-4 mt-5 bg-white rounded">
                <HeaderText
                  label="SK Pendirian BPM"
                  warna="#2654A1"
                  alignText="left"
                  fontWeight="700"
                  marginBottom="20px"
                />
                <Text 
                  isi={data[2].isi} 
                  alignText="left"
                  ukuran="16px"
                  warna="grey"
                />
                <Button
                  className="btn btn-primary"
                  title="Unduh SK Pendirian"
                  label="Unduh SK Pendirian"
                  onClick={handleClick}
                  iconName="download"
                />
              
              </div>
            </div>
            <div className="col-lg-1 col-md-6 mt-0 " ></div>
            <div className="col-lg-5 col-md-6 ">
              <img src={OrangKerja} alt="Logo" style={{ width: '100%', height: 'auto', marginBottom: '25px' , alignContent: 'center'}} />
          
            </div>            
        </div>
        
      </div>

      <div className="flex-grow-1 p-5" style={{backgroundColor: '#193756'}}>
          <div className="row">
              <div className="col-lg-6 col-md-6 p-4">
                <div className="card">
                  <HeaderText
                    label="Sasaran Badan Penjamin Mutu"
                    warna="white"
                    alignText="center"
                    ukuran="25px"
                    fontWeight="700"
                  />
                  <Text 
                    isi={data[1].isi} 
                    alignText="justify"
                    ukuran="16px"
                    warna="white"
                />  
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-4">
                <div className="card">
                  <HeaderText
                    label="Strategi Badan Penjamin Mutu"
                    warna="white"
                    alignText="center"
                    ukuran="25px"
                    fontWeight="700"
                  />
                  <Text 
                    isi={data[1].isi} 
                    alignText="justify"
                    ukuran="16px"
                    warna="white"
                />  
                </div>
              </div>
            </div>
      </div>

      <div  className="flex-grow-1 p-5">
        <HeaderText
            label="Struktur BPM "
            warna="#2654A1"
            alignText="center"
            fontWeight="700"
            marginBottom="50px"
        />
        
        <img src={StrukturBPM} alt="Logo" style={{ width: '100%', height: 'auto', marginBottom: '25px' , alignContent: 'center'}} />
          
      </div>

      <div className="latarGradasi2">
        <div className="d-flex flex-column align-items-center justify-content-start m-5 p-3" style={{ minHeight: '100vh', width: '800px' }}>
            <Icon
              name="book-open-cover"
              cssClass="text-white"
              ukuran="80px"
              margin="10px"
           />

            <HeaderText
              label="Visi"
              warna="white"
              alignText="center"
              ukuran="35px"
              fontWeight="700"
             
           />
           
            <Text 
              isi={data[3].isi} // Corrected index here
              alignText="center"
              ukuran="18px"
            />

            <HeaderText
              label="Misi"
              warna="white"
              alignText="center"
              ukuran="35px"
              fontWeight="700"
           />
            <Text 
              isi={data[4].isi} // Corrected index here
              alignText="center"
              ukuran="18px"
            />

              <img src={Gedung} alt="Bangunan" style={{ left:'50px',bottom:'0px',position:'absolute' , width: '100%', height: 'auto'}} />
              <img src={Mahasiswa} alt="Orang" style={{ left:'50px',bottom:'-80px', position:'relative' , width: '150%', height: 'auto'}} />
          
          
        </div>    
      </div>
    </>
  );
}
