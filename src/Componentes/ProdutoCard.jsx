import React from "react";
import { useCarrinho } from "./CarrinhoContext";
import imagensProdutos from "../assets/imagensProdutos";
import "../CSS/ProdutoCard.css";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProdutoCard({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();

  return (
    <article className="produto-card">
      <div className="produto-imagem-wrap">
        <img
          src={imagensProdutos[produto.imagem]}
          alt={produto.nome}
          loading="lazy"
        />
      </div>
      <div className="produto-corpo">
        <span className="produto-categoria">{produto.categoria}</span>
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>
        <div className="produto-rodape">
          <div>
            <div className="produto-preco">{formatarPreco(produto.preco)}</div>
            <div className="produto-estoque">{produto.estoque} em estoque</div>
          </div>
          <button
            className="botao-adicionar"
            onClick={() => adicionarAoCarrinho(produto)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
