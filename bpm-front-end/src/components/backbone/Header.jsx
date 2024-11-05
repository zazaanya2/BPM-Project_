import React from "react";
import brand from "../../assets/bpm-logo.png";

export default function Header() {
  return (
    <div
      className="d-flex justify-content-between fixed-top"
      style={{ backgroundColor: "#2654A1" }}
    >
      <div className="d-flex justify-content-start align-items-center">
        <img
          src={brand}
          alt="Logo AstraTech"
          className="navbar-brand ms-3"
          style={{ height: "60px" }}
        />
      </div>
      <div className="navmenu p-4">
        <ul className="nav">
          {/* Beranda */}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              Beranda
            </a>
          </li>
          {/* Tentang */}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              Tentang
            </a>
          </li>
          {/* Berita */}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              Berita
            </a>
          </li>
          {/* Kegiatan */}
          <li className="nav-item dropdown">
            <a className="nav-link " href="#">
              Kegiatan
              <i className="fi fi-rr-angle-small-down"></i>
            </a>

            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Rencana Kegiatan BPM
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Kegiatan BPM
                </a>
              </li>
            </ul>
          </li>
          {/* SPMI */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">
              SPMI
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-submenu">
                <a className="dropdown-item dropdown-toggle" href="#">
                  Siklus SPMI
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Penetapan
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pelaksanaan
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Evaluasi
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pengendalian
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Peningkatan
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Pernyataan dan Kebijakan Mutu
                </a>
              </li>
              <li className="dropdown-submenu">
                <a className="dropdown-item dropdown-toggle" href="#">
                  Dokumen SPMI
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Kebijakan SPMI
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Manual SPMI
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Standar SPMI
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Formulir SPMI
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      SOP
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Template Dokumen SPMI
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          {/* IKU & IKT */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">
              IKU & IKT
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Rencana Kegiatan BPM
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Kegiatan BPM
                </a>
              </li>
            </ul>
          </li>
          {/* Jadwal */}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              Jadwal
            </a>
          </li>
          {/* Survei */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">
              Survei
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Kriteria Survei
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Skala Peniaian
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Pertanyaan Survei
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Template Survei
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Survei
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Daftar Survei
                </a>
              </li>
            </ul>
          </li>
          {/* Peraturan */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">
              Peraturan
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Kebijakan Peraturan
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Peraturan Eksternal
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Instrumen APS
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="btn bg-white">Masuk</button>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </div>
    </div>
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <ul className="navbar-nav">
    //       <li className="nav-item dropdown">
    //         <a
    //           data-mdb-dropdown-init
    //           className="nav-link dropdown-toggle"
    //           href="#"
    //           id="navbarDropdownMenuLink"
    //           role="button"
    //           data-mdb-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Dropdown link
    //         </a>
    //         <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Submenu &raquo;
    //             </a>
    //             <ul className="dropdown-menu dropdown-submenu">
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Submenu item 1
    //                 </a>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Submenu item 2
    //                 </a>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Submenu item 3 &raquo;{" "}
    //                 </a>
    //                 <ul className="dropdown-menu dropdown-submenu">
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Multi level 1
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Multi level 2
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Submenu item 4
    //                 </a>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Submenu item 5
    //                 </a>
    //               </li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}
