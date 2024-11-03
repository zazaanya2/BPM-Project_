import {SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div style={{ textAlign: "-webkit-center" }} className="mt-5">
      <SyncLoader color="#0d6efd" loading={true} />
    </div>
  );
}
