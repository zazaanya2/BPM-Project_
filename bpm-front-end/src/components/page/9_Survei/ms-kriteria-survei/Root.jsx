import { useState } from "react";
import KriteriaKuesionerIndex from "./Index";
import KriteriaKuesionerAdd from "./Add";

export default function KriteriaKuesioner() {
  const [pageMode, setPageMode] = useState("index");

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <KriteriaKuesionerIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <KriteriaKuesionerAdd onChangePage={handleSetPageMode} />;
      default:
        return <KriteriaKuesionerIndex onChangePage={handleSetPageMode} />;
    }
  }

  function handleSetPageMode(mode) {
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}