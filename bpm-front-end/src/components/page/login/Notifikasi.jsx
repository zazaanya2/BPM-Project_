import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import HeaderText from "../../part/HeaderText";
import Text from "../../part/Text";
import PageTitleNav from "../../part/PageTitleNav";
import { useIsMobile } from "../../util/useIsMobile";
import { useEffect, useState } from "react";
import { useFetch } from "../../util/useFetch";
import { API_LINK } from "../../util/Constants";
import Loading from "../../part/Loading";
import moment from "moment";
import "moment/locale/id";

export default function Notifikasi() {
  moment.locale("id");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let activeUser = "";
  const cookie = Cookies.get("activeUser");
  if (cookie) activeUser = JSON.parse(cookie).RoleID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useFetch(
          `${API_LINK}/Utilities/GetDataNotifikasi`,
          { id: activeUser },
          "POST"
        );
        setData(result);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal mengambil data");
        setLoading(false);
      }
    };

    console.log(data);
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div className={isMobile ? "bg-white mt-5 p-0 pt-5" : "bg-white m-5 p-5"}>
      <PageTitleNav
        title="Notifikasi"
        breadcrumbs={[
          { label: "Profil Pengguna", href: "/profile" },
          { label: "Notifikasi" },
        ]}
        onClick={() => navigate("/profile")}
      />
      <div className="p-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="card-header p-3 mb-2 rounded-4 d-flex justify-content-between align-items-center"
            style={{
              backgroundColor:
                item.StatusBaca === 1 ? "rgba(181, 202, 251, 0.3)" : "#9D9D9D",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(item.LinkNotifikasi, {
                state: {
                  idData: item.kegiatanNotifikasi,
                },
              })
            }
          >
            <div className="d-flex align-items-center me-4">
              <i
                className={`fi fi-rr-envelope`}
                style={{
                  fontSize: "3.5rem",
                  margin: "0.5rem 1rem 0rem 1rem",
                  color: "#2654a1",
                }}
              ></i>
              <div className="d-flex flex-column align-items-start me-4 gap-2">
                <HeaderText
                  label={item.PesanNotifikasi} // Data dari API
                  ukuran="1.2rem"
                  warna="#2654a1"
                  alignText="left"
                  marginTop="0rem"
                  marginBottom="0rem"
                />

                <Text
                  isi={item.BodyPesan} // Data dari API
                  ukuran="0.9rem"
                  warna="#575050"
                  alignText="left"
                  style={{ marginBottom: "0rem" }}
                />

                <Text
                  isi={moment(item.tanggalNotifikasi)
                    .tz("Asia/Jakarta") // Menentukan zona waktu WIB
                    .format("dddd, D MMMM YYYY, HH:mm [WIB]")} // Data dari API
                  ukuran="0.8rem"
                  warna="#575050"
                  alignText="left"
                  style={{ marginBottom: "0rem" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
