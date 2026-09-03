import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CarrinhoProvider } from "./Componentes/CarrinhoContext";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import CarrinhoSidebar from "./Componentes/CarrinhoSidebar";
import Home from "./Pages/Home";
import Produtos from "./Pages/Produtos";
import Checkout from "./Pages/Checkout";
import "./CSS/App.css";

export default function App() {
  return (
    <CarrinhoProvider>
      <HashRouter>
        <div className="app-shell">
          <Header />
          <main className="conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          <CarrinhoSidebar />
        </div>
      </HashRouter>
    </CarrinhoProvider>
  );
}
