# Pétala (E-commerce de Beleza Natural e Sustentável)

Projeto de checkpoint (FIAP) desenvolvido em **React + Vite**, implementando funcionalidades interativas de e-commerce: manipulação de DOM, `localStorage`, consumo de JSON via `fetch`, e controle de fluxo assíncrono com `Promises`/`async-await`.

## Sobre o projeto

**Pétala** é um e-commerce especializado em produtos de beleza e cuidados pessoais naturais, parte da proposta EcoTrend de promover um estilo de vida mais consciente e sustentável.

## Grupo:

- Amanda Oliveira Lourenço — RM: 572572
- Giovanna Lopes Scalzone — RM: 572285
- Nayra Sousa Duarte — RM: 573815
- Paloma do Carmo Dantas — RM: 569995

## Funcionalidades

- **Catálogo dinâmico**: produtos carregados a partir de um arquivo `produtos.json` via `fetch`/`async-await`, com spinner de carregamento e tratamento de erros.
- **Filtros dinâmicos**: por categoria e por faixa de preço, sem recarregar a página.
- **Carrinho de compras persistente**: adição, remoção e alteração de quantidade em tempo real, salvo no `localStorage` (permanece após fechar o navegador).
- **Checkout simulado**: fluxo de finalização de compra usando `Promises` encadeadas (validação de dados, confirmação de pedido), com mensagens de sucesso/erro assíncronas via componente de notificação (Toast).


Projeto publicado via **GitHub Pages**:


**Link do site**: https://palomadantas16.github.io/CP_WEB/