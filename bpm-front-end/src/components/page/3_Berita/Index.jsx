import { useNavigate } from "react-router-dom";
import Button from "../../part/Button";

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/kelolaBerita"); 
  };

  return (
    <div className="position-absolute top-0 end-0 p-5 m-5">
      <Button
        class="btn btn-primary"
        label="Kelola Berita"
        onClick={handleClick}
      />
    </div>
  );
}