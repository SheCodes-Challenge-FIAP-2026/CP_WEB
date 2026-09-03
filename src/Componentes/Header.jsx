import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrinho } from "./CarrinhoContext";
import iconeCarrinho from "../assets/carrinho-de-compras.png";
import "../css/Header.css";

export default function Header() {
  const { quantidadeTotal, setCarrinhoAberto } = useCarrinho();
  const { pathname } = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">          
        <Link to="/" className="marca" onClick={fecharMenu}>
          <span className="marca-nome">PÉTALA</span>
        </Link>

        <nav className={`navegacao ${menuAberto ? "aberta" : ""}`}>
          <Link to="/" className={pathname === "/" ? "ativo" : ""} onClick={fecharMenu}>
            Início
          </Link>
          <Link to="/produtos" className={pathname === "/produtos" ? "ativo" : ""} onClick={fecharMenu}>
            Produtos
          </Link>
          <Link to="/checkout" className={pathname === "/checkout" ? "ativo" : ""} onClick={fecharMenu}>
            Checkout
          </Link>
        </nav>

        <div className="acoes-cabecalho">
          <button
            className="botao-carrinho"
            aria-label="Abrir carrinho de compras"
            onClick={() => setCarrinhoAberto(true)}
          >
          
            {quantidadeTotal > 0 && (
              <span className="badge-carrinho">{quantidadeTotal}</span>
            )} 
            <img
              src={iconeCarrinho}
              alt=""
            />
          </button>

          <button
            className="menu-hamburguer"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <i className={menuAberto ? "fas fa-times" : "fas fa-bars"} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {menuAberto && (
        <div className="navegacao-fundo" onClick={fecharMenu} />
      )}
    </header>
  );
}
