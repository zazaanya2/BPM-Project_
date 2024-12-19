import Swal from "sweetalert2"; // Import SweetAlert2
import Bangunan from "../../../assets/element/bangunan.png";
import Logo from "../../../assets/bpm-logo-biru.png";
import Button from "../../part/Button";
import Cookies from "js-cookie"; // Import js-cookie for cookie handling
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import HeaderText from "../../part/HeaderText";

export default function Profil() {
  const navigate = useNavigate(); // Hook untuk navigasi
  let activeUser = "";
  const cookie = Cookies.get("activeUser");
  if (cookie) activeUser = JSON.parse(cookie).Nama;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      Cookies.remove("yourCookieName"); // Ganti "yourCookieName" dengan nama cookie Anda
      navigate("/logout"); // Navigasi ke halaman logout
    }
  };

  return (
    <div
      className="latarGradasi"
      style={{ position: "relative", height: "100vh" }}
    >
      {/* Kotak shadow putih di tengah */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30rem",
          maxWidth: "90%",
          height: "30rem",
          backgroundColor: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          zIndex: 2,
          padding: "3rem",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "200px",
            height: "auto",
            display: "block",
            margin: "0 auto",
            marginBottom: "1rem",
          }}
        />

        <div className="card-header p-2 mb-2 rounded-4 bg-body-secondary d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center me-4">
            <i
              className={`fi fi-rs-circle-user`}
              style={{
                fontSize: "3.5rem",
                margin: "0.5rem 1rem 0rem 1rem",
                color: "#2654a1",
              }}
            ></i>
            <div className="d-flex flex-column align-items-start me-4 gap-2">
              <HeaderText
                label={activeUser}
                ukuran="1.2rem"
                warna="#2654a1"
                alignText="left"
                marginTop="0rem"
                marginBottom="0rem"
              />

              <HeaderText
                label="last login"
                ukuran="0.8rem"
                warna="#575050"
                alignText="left"
                marginTop="0rem"
                marginBottom="0rem"
              />
            </div>
          </div>
        </div>
        <div
          className="card-header p-2 mb-2 rounded-4 bg-body-secondary d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center me-4">
            <i
              className={`fi fi-rs-bell-notification-social-media`}
              style={{
                fontSize: "1.5rem",
                margin: "0rem 1rem 0rem 1rem",
                color: "#575050",
              }}
            ></i>
            <HeaderText
              label="Notifikasi"
              ukuran="1rem"
              warna="#575050"
              alignText="left"
              marginTop="0rem"
              marginBottom="0rem"
            />
          </div>
        </div>

        <div
          className="card-header p-2 mb-2 rounded-4 bg-body-secondary d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center me-4">
            <i
              className={`fi fi-rs-book-bookmark`}
              style={{
                fontSize: "1.5rem",
                margin: "0rem 1rem 0rem 1rem",
                color: "#575050",
              }}
            ></i>
            <HeaderText
              label="Panduan AMI"
              ukuran="1rem"
              warna="#575050"
              alignText="left"
              marginTop="0rem"
              marginBottom="0rem"
            />
          </div>
        </div>

        {/* Tombol logout dengan SweetAlert */}
        <div
          className="card-header p-2 mb-2 rounded-4 bg-danger d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={handleLogout} // Tambahkan event handler
        >
          <div className="d-flex align-items-center me-4">
            <i
              className={`fi fi-rs-leave`}
              style={{
                fontSize: "1.5rem",
                margin: "0rem 1rem 0rem 1rem",
                color: "white",
              }}
            ></i>
            <HeaderText
              label="Keluar"
              warna="white"
              ukuran="1rem"
              alignText="left"
              marginTop="0rem"
              marginBottom="0rem"
            />
          </div>
        </div>
      </div>

      {/* Gambar di bawah */}
      <img
        src={Bangunan}
        alt="Bangunan"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          left: "0",
          zIndex: 1,
        }}
      />
    </div>
  );
}
