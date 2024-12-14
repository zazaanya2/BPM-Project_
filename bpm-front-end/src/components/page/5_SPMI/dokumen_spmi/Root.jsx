import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ScrollToTop from "../../../part/ScrollToTop";
import Index from "./Index";
export default function DokumenSPMI() {
  const navigate = useNavigate();

  const handlePageChange = (page, withState = {}) => {
    switch (page) {
      case "index":
        navigate("/spmi/dokumen/kebijakan");
        break;
      case "editKonten":
        navigate("/spmi/siklus/penetapan/editkonten", withState);
        break;
      case "add":
        navigate("/spmi/siklus/penetapan/add");
        break;
      case "edit":
        navigate("/spmi/siklus/penetapan/edit");
        break;
      default:
        console.warn(`Halaman "${page}" tidak dikenali.`);
        break;
    }
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/spmi/dokumen/kebijakan"
          element={
            <Index
              onChangePage={handlePageChange}
              title={"Kebijakan SPMI"}
              breadcrumbs={[
                { label: "SPMI" },
                { label: "Dokumen SPMI" },
                { label: "Kebijakan" },
              ]}
            />
          }
        />
      </Routes>
    </>
  );
}
