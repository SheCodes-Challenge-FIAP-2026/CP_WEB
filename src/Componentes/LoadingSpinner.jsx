import React from "react";
import "../css/Spinner.css";

export default function LoadingSpinner({ texto = "Carregando..." }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{texto}</span>
    </div>
  );
}
