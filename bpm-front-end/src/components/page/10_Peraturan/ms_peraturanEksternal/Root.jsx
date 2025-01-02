import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Index from "../Index";
import Add from "../Add";
import Edit from "../Edit";
import Detail from "../Detail";
import ScrollToTop from "../../../part/ScrollToTop";
import ProtectedRoute from "../../../util/ProtectedRoute"; // Import the ProtectedRoute component

export default function PeraturanEksternal() {
  const navigate = useNavigate();
  const location = useLocation();
  const handlePageChange = (page, withState = {}) => {
    switch (page) {
      case "index":
        navigate("/peraturan/eksternal", {
          state: { mode: "index", ...withState },
        });
        break;
      case "add":
        navigate("/peraturan/eksternal", {
          state: { mode: "add", ...withState },
        });
        break;
      case "edit":
        navigate("/peraturan/eksternal", {
          state: { mode: "edit", ...withState },
        });
        break;
      case "detail":
        navigate("/peraturan/eksternal", {
          state: { mode: "detail", ...withState },
        });
        break;

      default:
        console.warn(`Halaman "${page}" tidak dikenali.`);
        break;
    }
  };

  const { mode } = location.state || { mode: "index" };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {
                // Berdasarkan mode, render komponen yang berbeda
                mode === "add" ? (
                  <Add onChangePage={handlePageChange} />
                ) : mode === "edit" ? (
                  <Edit onChangePage={handlePageChange} />
                ) : mode === "detail" ? (
                  <Detail onChangePage={handlePageChange} />
                ) : (
                  <Index onChangePage={handlePageChange} />
                )
              }
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
