import { useRef, useState } from "react";
import { object, string } from "yup";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import Button from "../../part/Button";
import Alert from "../../part/Alert";

export default function KriteriaSurveiAdd({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });

  // Data statis untuk simulasi ID yang sudah ada
  const existingIds = ["K001", "K002", "K003"];

  const formDataRef = useRef({
    id_kriteria_survei: "",
    kriteria_survei: "",
  });

  const userSchema = object({
    id_kriteria_survei: string().required("ID Kriteria Survei harus diisi"),
    kriteria_survei: string().required("Kriteria Survei harus diisi"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateInput(name, value, userSchema);
    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});

      // Cek apakah ID sudah ada
      if (existingIds.includes(formDataRef.current.id_kriteria_survei)) {
        alert("Gagal: ID Kriteria sudah ada");
        return;
      }

      // Simulasi penyimpanan data
      console.log("Data yang akan disimpan:", formDataRef.current);
      alert("Data kriteria berhasil disimpan");
      onChangePage("index");
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Tambah Kriteria Survei Baru
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="id_kriteria_survei" className="form-label">
                    ID Kriteria Survei
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.id_kriteria_survei ? "is-invalid" : ""
                    }`}
                    id="id_kriteria_survei"
                    name="id_kriteria_survei"
                    onChange={handleInputChange}
                  />
                  {errors.id_kriteria_survei && (
                    <div className="invalid-feedback">
                      {errors.id_kriteria_survei}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="kriteria_survei" className="form-label">
                    Kriteria Survei
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.kriteria_survei ? "is-invalid" : ""
                    }`}
                    id="kriteria_survei"
                    name="kriteria_survei"
                    onChange={handleInputChange}
                  />
                  {errors.kriteria_survei && (
                    <div className="invalid-feedback">
                      {errors.kriteria_survei}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div>
      </form>
    </>
  );
}