import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import produtosGeraisImg from "../assets/produtosGerais.png";
import Avaliacoes from "../Componentes/Avaliacoes";
import "../css/Home.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-texto">
          <h1>Beleza que respeita você e o planeta</h1>
          <p>
            Produtos de beleza e cuidados pessoais feitos com ingredientes
            naturais, embalagens sustentáveis e sem testes em animais.
          </p>
          <Link to="/produtos" className="botao-primario-home">
            Ver produtos
          </Link>
        </div>
        <div className="hero-imagem">
          <img src={logo} alt="" />

        </div>
      </section>

      <div className="valores">
        <div className="img-item">
          <img
            src={produtosGeraisImg}
            alt=""
          />
        </div>
        <div className="valor-item">
          <h3>Beleza consciente</h3>
          
          <p>Nossa marca nasceu com o propósito de unir beleza, autocuidado e sustentabilidade. Desenvolvemos produtos de beleza que valorizam ingredientes naturais, embalagens mais conscientes e processos que buscam reduzir os impactos no meio ambiente.</p>
          <p> A proposta é mostrar que cuidar da aparência não precisa significar deixar de cuidar do planeta. Por isso, buscamos utilizar materiais recicláveis ou reutilizáveis, reduzir o desperdício e incentivar escolhas de consumo mais responsáveis.</p>
          <p>Mais do que vender produtos de beleza, queremos construir uma marca que represente um novo jeito de consumir: mais consciente, natural e conectado com a natureza. Afinal, a verdadeira beleza também está em preservar o mundo em que vivemos.</p> 
        </div>
        
      </div>

      <Avaliacoes />
    </div>
  );
}
