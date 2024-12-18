import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../util/useFetch";
import { API_LINK } from "../util/Constants";
import Cookies from "js-cookie";

export default function NavItem() {
  const [menuItems, setMenuItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openGrandchild, setOpenGrandchild] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleDropdown = (menuId) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
    setOpenSubmenu(null);
    setOpenGrandchild(null);
  };

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    setOpenGrandchild(null);
  };

  const toggleGrandchild = (grandchild) => {
    setOpenGrandchild(openGrandchild === grandchild ? null : grandchild);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // Toggle user menu dropdown
  };

  useEffect(() => {
    const activeUser = Cookies.get("activeUser");

    if (activeUser) {
      setIsLoggedIn(true);
    }

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

  const buildMenuHierarchy = (data) => {
    const menuMap = {};
    const menuHierarchy = [];

    data.forEach((item) => {
      menuMap[item.idMenu] = { ...item, children: [] };
    });

    data.forEach((item) => {
      if (item.parentMenu) {
        menuMap[item.parentMenu].children.push(menuMap[item.idMenu]);
      } else {
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
                      <li
                        key={child.idMenu}
                        className={
                          child.children.length > 0 ? "dropdown-submenu" : ""
                        }
                      >
                        {/* Only make it a dropdown if there are grandchildren */}
                        {child.children.length > 0 ? (
                          <button
                            className="dropdown-item dropdown-toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubmenu(child.idMenu);
                            }}
                          >
                            {child.namaMenu}
                          </button>
                        ) : (
                          <Link
                            className="dropdown-item"
                            to={child.linkMenu || "#"}
                          >
                            {child.namaMenu}
                          </Link>
                        )}
                        {openSubmenu === child.idMenu && (
                          <ul className="dropdown-menu">
                            {child.children.map((grandchild) => (
                              <li key={grandchild.idMenu}>
                                <Link
                                  className="dropdown-item"
                                  to={grandchild.linkMenu || "#"}
                                  onClick={() => {
                                    console.log(grandchild.linkMenu);
                                    toggleGrandchild(grandchild.idMenu);
                                  }}
                                >
                                  {grandchild.namaMenu}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
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
          {isLoggedIn ? (
            // Jika ada cookie, tampilkan ikon pengguna
            <div className="btn bg-white" onClick={toggleUserMenu}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                alt="User Icon"
                style={{ width: "24px", height: "24px" }}
              />
              {isUserMenuOpen && (
                <ul className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button onClick={() => Cookies.remove("activeUser")}>
                    Logout
                  </button>
                </ul>
              )}
            </div>
          ) : (
            // Jika tidak ada cookie, tampilkan tombol masuk
            <Link to="/login" className="btn bg-white">
              Masuk
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
