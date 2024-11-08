export default function DetailData({ label, isi, id }) {
    return (
      <>
        <label htmlFor={id} className="form-label fw-bold">{label}</label>
        <p htmlFor={id} className="text-secondary mb-4">{isi}</p>
      </>
    );
  }
  