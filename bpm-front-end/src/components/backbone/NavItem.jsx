import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../util/useFetch";
import { API_LINK } from "../util/Constants";

export default function NavItem() {
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan menu
  const [openDropdown, setOpenDropdown] = useState(null); // Dropdown utama yang terbuka
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = (menuId) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu); // Toggle submenu
  };

  // Ambil data menu dari API dan konversi ke hierarki
  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await useFetch(
        `${API_LINK}/Utilities/GetListMenu`,
        {},
        "POST"
      );
      if (data !== "ERROR") {
        setMenuItems(buildMenuHierarchy(data));
      } else {
        console.error("Gagal mengambil data menu");
      }
    };

    fetchMenuItems();
  }, []);

  // Fungsi untuk membangun hierarki menu dari data flat
  const buildMenuHierarchy = (data) => {
    const menuMap = {}; // Untuk menyimpan referensi menu berdasarkan idMenu
    const menuHierarchy = []; // Menyimpan hasil menu hierarkis

    // Inisialisasi menu dalam menuMap
    data.forEach((item) => {
      menuMap[item.idMenu] = { ...item, children: [] };
    });

    // Bangun hierarki
    data.forEach((item) => {
      if (item.parentMenu) {
        // Jika ada parent, tambahkan ke children parent
        menuMap[item.parentMenu].children.push(menuMap[item.idMenu]);
      } else {
        // Jika tidak ada parent, tambahkan ke root menu
        menuHierarchy.push(menuMap[item.idMenu]);
      }
    });

    return menuHierarchy;
  };

  return (
    <nav>
      <ul className="nav">
        {menuItems.map((menu) => (
          <li
            key={menu.idMenu}
            className={`nav-item ${menu.children.length > 0 ? "dropdown" : ""}`}
          >
            {/* Tipe dropdown jika ada anak */}
            {menu.children.length > 0 ? (
              <>
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => toggleDropdown(menu.idMenu)}
                >
                  {menu.namaMenu}
                </button>
                {openDropdown === menu.idMenu && (
                  <ul className="dropdown-menu">
                    {menu.children.map((child) => (
                      <li key={child.idMenu}>
                        <Link
                          className="dropdown-item"
                          to={child.linkMenu || "#"}
                        >
                          {child.namaMenu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Tipe non-dropdown jika tidak ada anak
              <Link className="nav-link" to={menu.linkMenu || "#"}>
                {menu.namaMenu}
              </Link>
            )}
          </li>
        ))}
        <li className="nav-item ms-3">
          <button className="btn bg-white">Masuk</button>
        </li>
      </ul>
    </nav>
  );
}
