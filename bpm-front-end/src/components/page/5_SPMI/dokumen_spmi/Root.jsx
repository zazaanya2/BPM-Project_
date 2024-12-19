import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../../../part/ScrollToTop";
import { ROOT_LINK } from "../../../util/Constants";
import Index from "./Index";
import Add from "./Add";

export default function DokumenSPMI() {
  const navigate = useNavigate();
  const location = useLocation(); // Access current location for path
  const currentPath = location.pathname;

  // Handler for page navigation
  const handlePageChange = (page, withState = {}) => {
    switch (page) {
      case "index":
        navigate(`${currentPath}`, { state: withState });
        break;

      case "add":
        navigate(`${currentPath}/add`, { state: withState });
        break;

      case "edit":
        navigate("/spmi/siklus/penetapan/edit", { state: withState });
        break;

      case "editKonten":
        navigate("/spmi/siklus/penetapan/editkonten", { state: withState });
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
        {/* Route for index */}
        <Route
          path=":jenis"
          element={
            <Index
              breadcrumbs={[
                { label: "SPMI" },
                { label: "Dokumen SPMI" },
              ]}
            />
          }
        />

        {/* Route for add */}
        <Route
          path=":jenis/add"
          element={<Add />}
        />
      </Routes>
    </>
  );
}
