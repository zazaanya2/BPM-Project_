import React from "react";
import logo from "../../assets/IMG_Logo_White.png";
import Icon from "../part/Icon";

export default function Header() {
  return (
    // <div
    //   className="d-flex justify-content-between fixed-top border-bottom"
    //   style={{ backgroundColor: "#2654A1" }}
    // >
    //   <img
    //     src={logo}
    //     alt="Logo AstraTech"
    //     className="p-3 ms-1"
    //     style={{ height: "90px" }}
    //   />
    //   <div className="pe-4 my-auto">
    //     <div className="d-flex justify-content-end">
    //       <ul className="nav">
    //         {/* Beranda */}
    //         <li className="nav-item">
    //           <a
    //             className="nav-link active text-white"
    //             aria-current="page"
    //             href="#"
    //           >
    //             Beranda
    //           </a>
    //         </li>
    //         {/* Tentang */}
    //         <li className="nav-item">
    //           <a
    //             className="nav-link active text-white"
    //             aria-current="page"
    //             href="#"
    //           >
    //             Tentang
    //           </a>
    //         </li>
    //         {/* Berita */}
    //         <li className="nav-item">
    //           <a
    //             className="nav-link active text-white"
    //             aria-current="page"
    //             href="#"
    //           >
    //             Berita
    //           </a>
    //         </li>
    //         {/* Kegiatan */}
    //         <li className="nav-item">
    //           <a
    //             className="nav-link dropdown-toggle text-white"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Kegiatan
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Rencana Kegiatan BPM
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Kegiatan BPM
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         {/* SPMI */}
    //         <li className="nav-item">
    //           <a
    //             className="nav-link dropdown-toggle text-white"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             SPMI
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li className="nav-item dropdown">
    //               <a
    //                 data-mdb-dropdown-init
    //                 className="nav-link dropdown-toggle"
    //                 href="#"
    //                 id="navbarDropdownMenuLink"
    //                 role="button"
    //                 data-mdb-toggle="dropdown"
    //                 aria-expanded="false"
    //               >
    //                 Dropdown link
    //               </a>
    //               <ul
    //                 className="dropdown-menu"
    //                 aria-labelledby="navbarDropdownMenuLink"
    //               >
    //                 <li>
    //                   <a className="dropdown-item" href="#">
    //                     Action
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a className="dropdown-item" href="#">
    //                     Another action
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a className="dropdown-item" href="#">
    //                     Submenu &raquo;
    //                   </a>
    //                   <ul className="dropdown-menu dropdown-submenu">
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Submenu item 1
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Submenu item 2
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Submenu item 3 &raquo;{" "}
    //                       </a>
    //                       <ul className="dropdown-menu dropdown-submenu">
    //                         <li>
    //                           <a className="dropdown-item" href="#">
    //                             Multi level 1
    //                           </a>
    //                         </li>
    //                         <li>
    //                           <a className="dropdown-item" href="#">
    //                             Multi level 2
    //                           </a>
    //                         </li>
    //                       </ul>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Submenu item 4
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="dropdown-item" href="#">
    //                         Submenu item 5
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </li>
    //               </ul>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Kegiatan BPM
    //               </a>
    //             </li>
    //           </ul>
    //         </li>

    //         {/* SPME */}
    //         <li className="nav-item">
    //           <div className="dropdown dropdown-hover">
    //             <button
    //               data-mdb-button-init
    //               data-mdb-ripple-init
    //               data-mdb-dropdown-init
    //               className="btn btn-primary dropdown-toggle"
    //               type="button"
    //               id="dropdownMenuButton"
    //               data-mdb-toggle="dropdown"
    //               aria-expanded="false"
    //             >
    //               Dropdown button
    //             </button>
    //             <ul
    //               className="dropdown-menu dropdown-menu-hover"
    //               aria-labelledby="dropdownMenuButton"
    //             >
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Action
    //                 </a>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   Another action
    //                 </a>
    //               </li>
    //               <li>
    //                 <a className="dropdown-item" href="#">
    //                   {" "}
    //                   Submenu &raquo;{" "}
    //                 </a>
    //                 <ul className="dropdown-menu dropdown-submenu">
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Submenu item 1
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Submenu item 2
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Submenu item 3 &raquo;{" "}
    //                     </a>
    //                     <ul className="dropdown-menu dropdown-submenu">
    //                       <li>
    //                         <a className="dropdown-item" href="#">
    //                           Multi level 1
    //                         </a>
    //                       </li>
    //                       <li>
    //                         <a className="dropdown-item" href="#">
    //                           Multi level 2
    //                         </a>
    //                       </li>
    //                     </ul>
    //                   </li>
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Submenu item 4
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a className="dropdown-item" href="#">
    //                       Submenu item 5
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </li>
    //             </ul>
    //           </div>
    //         </li>
    //         <li className="nav-item">
    //           <a
    //             className="nav-link dropdown-toggle text-white"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             IKU & IKT
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Rencana Kegiatan BPM
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Kegiatan BPM
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="nav-item">
    //           <a
    //             className="nav-link active text-white"
    //             aria-current="page"
    //             href="#"
    //           >
    //             Jadwal
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a
    //             className="nav-link dropdown-toggle text-white"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Survei
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Kriteria Survei
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Skala Peniaian
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Pertanyaan Survei
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Template Survei
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Survei
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Daftar Survei
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="nav-item">
    //           <a
    //             className="nav-link dropdown-toggle text-white"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Peraturan
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Kebijakan Peraturan
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Peraturan Eksternal
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Instrumen APS
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li className="nav-item">
    //           <button className="btn bg-white">Masuk</button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              data-mdb-dropdown-init
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Submenu &raquo;
                </a>
                <ul className="dropdown-menu dropdown-submenu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Submenu item 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Submenu item 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Submenu item 3 &raquo;{" "}
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Multi level 1
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Multi level 2
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Submenu item 4
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Submenu item 5
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
