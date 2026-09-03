import React from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "./CarrinhoContext";
import imagensProdutos from "../assets/imagensProdutos";
import "../CSS/Carrinho.css";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CarrinhoSidebar() {
  const {
    itens,
    total,
    carrinhoAberto,
    setCarrinhoAberto,
    removerDoCarrinho,
    alterarQuantidade,
  } = useCarrinho();

  if (!carrinhoAberto) return null;

  return (
    <>
      <div
        className="carrinho-fundo"
        onClick={() => setCarrinhoAberto(false)}
      />
      <aside className="carrinho-painel" aria-label="Carrinho de compras">
        <div className="carrinho-cabecalho">
          <h3>Seu carrinho</h3>
          <button
            className="carrinho-fechar"
            aria-label="Fechar carrinho"
            onClick={() => setCarrinhoAberto(false)}
          >
            ×
          </button>
        </div>

        <div className="carrinho-lista">
          {itens.length === 0 && (
            <p className="carrinho-vazio">Seu carrinho está vazio.</p>
          )}

          {itens.map((item) => (
            <div className="carrinho-item" key={item.id}>
              <img
                src={imagensProdutos[item.imagem]}
                alt={item.nome}
              />
              <div className="carrinho-item-info">
                <span className="carrinho-item-nome">{item.nome}</span>
                <span className="carrinho-item-preco">
                  {formatarPreco(item.preco)}
                </span>
                <div className="carrinho-item-controles">
                  <button
                    className="botao-quantidade"
                    aria-label="Diminuir quantidade"
                    onClick={() => alterarQuantidade(item.id, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    className="botao-quantidade"
                    aria-label="Aumentar quantidade"
                    onClick={() => alterarQuantidade(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="carrinho-item-remover"
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    <i className="fas fa-trash-can" aria-hidden="true"></i>
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {itens.length > 0 && (
          <div className="carrinho-rodape">
            <div className="carrinho-total">
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="botao-primario"
              onClick={() => setCarrinhoAberto(false)}
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
