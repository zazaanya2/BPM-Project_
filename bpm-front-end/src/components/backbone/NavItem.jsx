export default function NavItem() {
    return (
        <>
            {/* Beranda */}
            <li className="nav-item" style={{ marginRight: '10px' }}>
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Kegiatan
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    SPMI
                </a>
                <ul className="dropdown-menu">
                    <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                            Siklus SPMI
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Penetapan</a></li>
                            <li><a className="dropdown-item" href="#">Pelaksanaan</a></li>
                            <li><a className="dropdown-item" href="#">Evaluasi</a></li>
                            <li><a className="dropdown-item" href="#">Pengendalian</a></li>
                            <li><a className="dropdown-item" href="#">Peningkatan</a></li>
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
                            <li><a className="dropdown-item" href="#">Kebijakan SPMI</a></li>
                            <li><a className="dropdown-item" href="#">Manual SPMI</a></li>
                            <li><a className="dropdown-item" href="#">Standar SPMI</a></li>
                            <li><a className="dropdown-item" href="#">Formulir SPMI</a></li>
                            <li><a className="dropdown-item" href="#">SOP</a></li>
                            <li><a className="dropdown-item" href="#">Template Dokumen SPMI</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            {/* SPME */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    SPME
                </a>
                <ul className="dropdown-menu">
                    <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                            Status Akreditasi
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Tabel Ringkasan Status Akreditasi</a></li>
                            <li><a className="dropdown-item" href="#">Akreditasi Program Studi</a></li>
                        </ul>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Panduan Akreditasi
                        </a>
                    </li>
                </ul>
            </li>
            {/* IKU & IKT */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    IKU & IKT
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Surat Keputusan</a></li>
                    <li><a className="dropdown-item" href="#">Lampiran SK</a></li>
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Survei
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Kriteria Survei</a></li>
                    <li><a className="dropdown-item" href="#">Skala Penilaian</a></li>
                    <li><a className="dropdown-item" href="#">Pertanyaan Survei</a></li>
                    <li><a className="dropdown-item" href="#">Template Survei</a></li>
                    <li><a className="dropdown-item" href="#">Survei</a></li>
                    <li><a className="dropdown-item" href="#">Daftar Survei</a></li>
                </ul>
            </li>
            {/* Peraturan */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Peraturan
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Kebijakan Peraturan</a></li>
                    <li><a className="dropdown-item" href="#">Peraturan Eksternal</a></li>
                    <li><a className="dropdown-item" href="#">Instrumen APS</a></li>
                </ul>
            </li>
            {/* Masuk Button */}
            <li className="nav-item ms-3">
                <button className="btn bg-white">Masuk</button>
            </li>
        </>
    );
}
