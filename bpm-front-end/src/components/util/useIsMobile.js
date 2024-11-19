import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 850) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint); // Sesuaikan dengan breakpoint
    };

    handleResize(); // Set state awal saat komponen pertama kali dirender
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
