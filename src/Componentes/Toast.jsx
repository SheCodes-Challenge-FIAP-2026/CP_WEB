import React, { useEffect } from "react";
import "../CSS/Toast.css";

export default function Toast({ mensagem, tipo = "sucesso", onFechar }) {
  useEffect(() => {
    const temporizador = setTimeout(onFechar, 4000);
    return () => clearTimeout(temporizador);
  }, [onFechar]);

  if (!mensagem) return null;

  return (
    <div className={`toast ${tipo === "erro" ? "erro" : ""}`} role="alert">
      <span>{mensagem}</span>
      <button className="toast-fechar" onClick={onFechar} aria-label="Fechar aviso">
        ×
      </button>
    </div>
  );
}
