import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({
  children,
  isRole = false,
  path = "",
}) {
  let role = "";
  const activeUser = Cookies.get("activeUser");
  if (activeUser) role = JSON.parse(activeUser).RoleID.slice(0, 5);
  console.log(activeUser);

  if (!activeUser) {
    return <Navigate to="/login" />;
  } else if (isRole) {
    if (role !== "ROL01") {
      console.log(role);
      return <Navigate to="/" />;
    }
  }

  return children;
}
