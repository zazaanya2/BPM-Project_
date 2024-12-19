import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Index from "./Index";
import Add from "./Add";
import Edit from "./Edit";
import ScrollToTop from "../../../part/ScrollToTop";
import UpdateHistory from "./UpdateHistory";
import Detail from "./Detail";

export default function PeraturanEksternal() {
  const navigate = useNavigate();

  const handlePageChange = (page, withState = {}) => {
    switch (page) {
      case "index":
        navigate("/peraturan/eksternal");
        break;
      case "add":
        navigate("/peraturan/eksternal/tambah");
        break;
      case "edit":
        navigate("/peraturan/eksternal/edit");
        break;
      case "detail":
        navigate("/peraturan/eksternal/detail");
        break;
      case "updateHistory":
        navigate("/peraturan/eksternal/updateHistory");
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
        <Route path="/" element={<Index onChangePage={handlePageChange} />} />
        <Route
          path="/tambah"
          element={<Add onChangePage={handlePageChange} />}
        />
        <Route
          path="/edit"
          element={<Edit onChangePage={handlePageChange} />}
        />
        <Route
          path="/detail"
          element={<Detail onChangePage={handlePageChange} />}
        />
        <Route
          path="/updateHistory"
          element={<UpdateHistory onChangePage={handlePageChange} />}
        />
      </Routes>
    </>
  );
}
