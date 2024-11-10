import Button from "./Button";
import HeaderText from "./HeaderText";

const CardBerita = ({ title, author, date, description, image, size = "large", onClick }) => {
  const maxDescriptionLength = size === "small" ? 100 : 280;
  const truncatedDescription = description.length > maxDescriptionLength 
    ? description.slice(0, maxDescriptionLength) + '...' 
    : description;

  const cardStyle = {
    borderRadius: '15px', 
    boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.2)', 
    marginBottom: '20px',
    maxWidth: '99%',
    padding: '20px',
    position: 'relative',
  };

  const imgStyle = {
    width: size === 'small' ? '300px' : '200px', 
    height: '100%',
    objectFit: 'cover', 
    borderRadius: '15px',
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    paddingBottom: size === 'small' ? '40px' : '60px', 
    marginBottom: '30px'
  };

  const buttonStyle = {
    alignSelf: 'flex-start',
    position: size === 'small' ? 'relative' : 'absolute',
    bottom: size === 'small' ? '0px' : '-10px', // Lower button on large size
    left: size === 'small' ? '0px' : '15px',
    bottom:'-28px'
  };

  return (
    <div style={cardStyle}>
      <div className="row g-0">
        <div className={size === 'small' ? 'col-md-4 p-3' : 'col-md-2 p-3'}>
          <img 
            src={image} 
            alt={title}
            style={imgStyle}
            className="img-fluid"
          />
        </div>
        
        <div className={size === 'small' ? 'col-md-8 p-3' : 'col-md-10 p-3 '} style={textContainerStyle}>
          <HeaderText
              label={title}
              ukuran="18px"
              warna="black"
              fontWeight="700"
              alignText="left"
              marginBottom="10px"
              marginTop="0px"
          />
          
          <p style={{ color: '#007bff', fontSize: '14px' , marginBottom:'10px'}}>
            Oleh {author} | {date}
          </p>

          <p className="card-text" style={{ fontSize: '14px', color: '#555' }}>
            {truncatedDescription}
          </p>

          <div style={buttonStyle}>
            <Button
                label="Selengkapnya"
                classType="primary"
                onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;
