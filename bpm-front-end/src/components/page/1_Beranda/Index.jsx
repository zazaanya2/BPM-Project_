import HeaderText from "../../part/HeaderText";

export default function Index({ onChangePage }) {
  return (
    <>
      <div className="latarGradasi mt-5">
        <div className="col-lg-6 col-md-6 p-5 align-items-center">
          <HeaderText
            label="Sejahtera Bersama Bangsa"
            alignText="left"
            warna="white"
            fontWeight="700"
          />
        </div>
        <div className="col-lg-6 col-md-6"></div>
      </div>
    </>
  );
}
