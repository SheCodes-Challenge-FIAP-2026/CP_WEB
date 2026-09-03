import React, { createContext, useContext, useEffect, useState } from "react";

const CHAVE_STORAGE = "ecotrend_carrinho";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvos = localStorage.getItem(CHAVE_STORAGE);
      return salvos ? JSON.parse(salvos) : [];
    } catch (erro) {
      console.error("Não foi possível ler o carrinho salvo:", erro);
      return [];
    }
  });

  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
    } catch (erro) {
      console.error("Não foi possível salvar o carrinho:", erro);
    }
  }, [itens]);

  function adicionarAoCarrinho(produto) {
    setItens((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
    setCarrinhoAberto(true);
  }

  function removerDoCarrinho(id) {
    setItens((atual) => atual.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id, delta) {
    setItens((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);

  const valor = {
    itens,
    total,
    quantidadeTotal,
    carrinhoAberto,
    setCarrinhoAberto,
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    limparCarrinho,
  };

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error("useCarrinho precisa ser usado dentro de um CarrinhoProvider");
  }
  return contexto;
}
