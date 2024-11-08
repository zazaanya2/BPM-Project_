export default function Icon({
  type = "Reguler", 
  name,
  cssClass = "",
  ukuran = "16px", // default ukuran
  margin = "0px",  // default margin
  ...props
}) {
 
  const prefix = 
    type === "Bold" ? "fi fi-br" : 
    type === "Reguler" ? "fi fi-rr" : 
    type === "Brands" ? "fi fi-brands" : 
    type === "Block" ? "fi fi-block" : 
    "fi fi-rr"; 

  const iconClass = `${prefix}-${name} ${cssClass}`;

  return <i className={iconClass} style={{ fontSize: ukuran, margin }} {...props}></i>;
}
