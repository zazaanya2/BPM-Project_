import React, { useState } from 'react';
import CardBerita from './CardBerita';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SliderBerita = ({ beritaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % beritaItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? beritaItems.length - 1 : prevIndex - 1
    );
  };

  const handleCardClick = (item) => {
    navigate('/lihatBerita', { state: item });
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '788px', // Membatasi lebar keseluruhan slider
      width: '100%',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Button Prev */}
      <button
        onClick={handlePrev}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#007bff',
          marginRight: '10px'
        }}
      >
        <FaArrowLeft />
      </button>

      {/* Slider Wrapper */}
      <div style={{ overflow: 'hidden', width: '90%' , padding:'3px'}}>
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {beritaItems.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                minWidth: '100%', // Menjaga agar setiap CardBerita mengambil 100% lebar tampilan slider
                boxSizing: 'border-box',
                
              }}
            >
              <CardBerita
                title={item.title}
                author={item.author}
                date={item.date}
                description={item.description}
                image={item.images[0]} // Only the first image is used
                size="small"
                onClick={() => handleCardClick(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Button Next */}
      <button
        onClick={handleNext}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#007bff',
          marginLeft: '10px'
        }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SliderBerita;
