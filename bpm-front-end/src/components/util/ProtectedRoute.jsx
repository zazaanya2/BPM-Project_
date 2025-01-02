import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const activeUser = Cookies.get("activeUser");

  if (!activeUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
