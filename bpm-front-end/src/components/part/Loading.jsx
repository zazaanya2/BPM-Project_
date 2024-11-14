import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Menjajarkan secara horizontal
        alignItems: "center", // Menjajarkan secara vertikal
        backgroundColor: "white", // Latar belakang putih
        minHeight: "95vh", // Tinggi 95% dari viewport
        margin: 0, // Menghilangkan margin default
      }}
    >
      <SyncLoader color="#0d6efd" loading={true} />
    </div>
  );
}
