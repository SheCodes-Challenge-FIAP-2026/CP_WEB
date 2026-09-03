import React from "react";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="rodape-coluna">
          <h4>PÉTALA</h4>
          <p>Beleza e cuidados pessoais com origem natural e consciente.</p>
        </div>
       
        <div className="rodape-coluna">
          <h4>Redes sociais</h4>
          <p>
            <i className="fab fa-instagram" aria-hidden="true"></i> @petalabeleza
          </p>
          
        </div>
      </div>
      <div className="rodape-base">
        © {new Date().getFullYear()} Pétala | Projeto de checkpoint FIAP.
      </div>
    </footer>
  );
}
