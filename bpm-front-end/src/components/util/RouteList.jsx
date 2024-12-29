// RouteList.jsx
import { lazy } from "react";

// Lazy load components
const Login = lazy(() => import("../page/login/Index"));
const Logout = lazy(() => import("../page/logout/Index"));
const Profil = lazy(() => import("../page/login/Profil"));
const Notifikasi = lazy(() => import("../page/login/Notifikasi"));

const Beranda = lazy(() => import("../page/1_Beranda/Root"));
const Tentang = lazy(() => import("../page/2_Tentang/Root"));
const Berita = lazy(() => import("../page/3_Berita/Root"));
const JadwalKegiatan = lazy(() =>
  import("../page/4_Kegiatan/ms_jadwalKegiatan/Root")
);
const DokumentasiKegiatan = lazy(() =>
  import("../page/4_Kegiatan/ms_dokumentasiKegiatan/Root")
);
const Pelaksanaan = lazy(() =>
  import("../page/5_SPMI/siklus_spmi/pelaksanaan/Root")
);
const Penetapan = lazy(() =>
  import("../page/5_SPMI/siklus_spmi/penetapan/Root")
);
const Peningkatan = lazy(() =>
  import("../page/5_SPMI/siklus_spmi/peningkatan/Root")
);
const Pengendalian = lazy(() =>
  import("../page/5_SPMI/siklus_spmi/pengendalian/Root")
);
const Evaluasi = lazy(() => import("../page/5_SPMI/siklus_spmi/evaluasi/Root"));
const Peraturan = lazy(() =>
  import("../page/10_Peraturan/ms_kebijakanPeraturan/Root")
);
const PeraturanEksternal = lazy(() =>
  import("../page/10_Peraturan/ms_peraturanEksternal/Root")
);
const InstrumenAps = lazy(() =>
  import("../page/10_Peraturan/ms_instrumenAps/Root")
);
const KriteriaSurvei = lazy(() =>
  import("../page/9_Survei/Kriteria_Survei/Root")
);
const SkalaSurvei = lazy(() => import("../page/9_Survei/Skala_Penilaian/Root"));
const NotFound = lazy(() => import("../page/not-found/Index"));

// Define route list
const routeList = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profil />,
    protected: true,
  },
  {
    path: "/notifikasi",
    element: <Notifikasi />,
    protected: true,
  },
  {
    path: "/logout",
    element: <Logout />,
    protected: true,
  },
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/tentang/*",
    element: <Tentang />,
  },
  {
    path: "/berita/*",
    element: <Berita />,
  },
  {
    path: "/kegiatan/jadwal/*",
    element: <JadwalKegiatan />,
  },
  {
    path: "/kegiatan/dokumentasi/*",
    element: <DokumentasiKegiatan />,
  },
  {
    path: "/spmi/siklus/pelaksanaan/*",
    element: <Pelaksanaan />,
  },
  {
    path: "/spmi/siklus/penetapan/*",
    element: <Penetapan />,
  },
  {
    path: "/spmi/siklus/peningkatan/*",
    element: <Peningkatan />,
  },
  {
    path: "/spmi/siklus/pengendalian/*",
    element: <Pengendalian />,
  },
  {
    path: "/spmi/siklus/evaluasi/*",
    element: <Evaluasi />,
  },
  {
    path: "/peraturan/kebijakan/*",
    element: <Peraturan />,
  },
  {
    path: "/peraturan/eksternal/*",
    element: <PeraturanEksternal />,
  },
  {
    path: "/peraturan/aps/*",
    element: <InstrumenAps />,
  },
  {
    path: "/survei/kriteria/*",
    element: <KriteriaSurvei />,
  },
  {
    path: "/survei/skala/*",
    element: <SkalaSurvei />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routeList;
