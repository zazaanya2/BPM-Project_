export default function Header({
  label,
  warna = "#5F5858",
  ukuran = "30px",
  alignText = "center",
  marginBottom = "40px",
  fontWeight = "600", // Default ketebalan teks adalah normal
  marginTop = "10px",
}) {
  return (
    <h3
      style={{
        color: warna,
        fontSize: ukuran,
        textAlign: alignText,
        marginBottom: marginBottom,
        fontWeight: fontWeight, // Mengatur ketebalan teks
        marginTop : marginTop,
      }}
    >
      {label}
    </h3>
  );
}
