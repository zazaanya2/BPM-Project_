import React from 'react';

const Text = ({ isi, ukuran = '15px', alignText = 'left', warna = 'white', style = {} }) => {
  return (
    <p 
      style={{
        fontFamily: 'Poppins, sans-serif', 
        color: warna,  // Mengatur warna teks berdasarkan props
        fontSize: ukuran, 
        textAlign: alignText, // Mengatur perataan teks berdasarkan props
        ...style // Untuk menggabungkan dengan style lain yang ditambahkan
      }}
    >
      {isi}
    </p>
  );
};

export default Text;
