import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../Componentes/CarrinhoContext";
import LoadingSpinner from "../Componentes/LoadingSpinner";
import Toast from "../Componentes/Toast";
import "../CSS/Checkout.css";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function validarDados(dados) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dados.nome || !dados.email || !dados.endereco) {
        reject(new Error("Preencha todos os campos obrigatórios."));
        return;
      }
      if (!dados.email.includes("@")) {
        reject(new Error("Informe um e-mail válido."));
        return;
      }
      resolve(dados);
    }, 700);
  });
}

function confirmarPedido(dados) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        numeroPedido: Math.floor(100000 + Math.random() * 900000),
        ...dados,
      });
    }, 1000);
  });
}

export default function Checkout() {
  const { itens, total, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    endereco: "",
    pagamento: "pix",
  });
  const [processando, setProcessando] = useState(false);
  const [toast, setToast] = useState(null);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((atual) => ({ ...atual, [name]: value }));
  }

  function finalizarCompra(evento) {
    evento.preventDefault();
    setProcessando(true);

    validarDados(formulario)
      .then((dadosValidos) => confirmarPedido(dadosValidos))
      .then((pedido) => {
        setToast({
          tipo: "sucesso",
          mensagem: `Pedido #${pedido.numeroPedido} confirmado! Enviamos os detalhes para ${pedido.email}.`,
        });
        limparCarrinho();
        setTimeout(() => navigate("/"), 2500);
      })
      .catch((erro) => {
        setToast({ tipo: "erro", mensagem: erro.message });
      })
      .finally(() => {
        setProcessando(false);
      });
  }

  if (itens.length === 0) {
    return (
      <div className="checkout-vazio">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos antes de finalizar a compra.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Finalizar compra</h1>

      {processando ? (
        <LoadingSpinner texto="Processando seu pedido..." />
      ) : (
        <div className="checkout-layout">
          <form className="checkout-formulario" onSubmit={finalizarCompra}>
            <div className="campo">
              <label htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formulario.nome}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formulario.email}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="endereco">Endereço de entrega</label>
              <input
                id="endereco"
                name="endereco"
                type="text"
                value={formulario.endereco}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="linha-campos">
              <div className="campo">
                <label htmlFor="pagamento">Forma de pagamento</label>
                <select
                  id="pagamento"
                  name="pagamento"
                  value={formulario.pagamento}
                  onChange={atualizarCampo}
                >
                  <option value="pix">Pix</option>
                  <option value="cartao">Cartão de crédito</option>
                  <option value="boleto">Boleto</option>
                </select>
              </div>
            </div>

            <button type="submit" className="botao-primario">
              Confirmar pedido
            </button>
          </form>

          <div className="checkout-resumo">
            <h3>Resumo do pedido</h3>
            {itens.map((item) => (
              <div className="resumo-item" key={item.id}>
                <span>
                  {item.nome} × {item.quantidade}
                </span>
                <span>{formatarPreco(item.preco * item.quantidade)}</span>
              </div>
            ))}
            <div className="resumo-total">
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onFechar={() => setToast(null)}
        />
      )}
    </div>
  );
}
