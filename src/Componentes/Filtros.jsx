import React from "react";
import "../css/Filtros.css";

export default function Filtros({
  categorias,
  categoriaAtiva,
  onMudarCategoria,
  precoMaximo,
  precoLimite,
  onMudarPreco,
  onLimpar,
}) {
  return (
    <div className="filtros">
      <div className="filtro-grupo">
        <label>Categoria</label>
        <div className="filtro-categorias">
          <button
            className={`filtro-categoria-botao ${
              categoriaAtiva === "Todas" ? "ativo" : ""
            }`}
            onClick={() => onMudarCategoria("Todas")}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`filtro-categoria-botao ${
                categoriaAtiva === categoria ? "ativo" : ""
              }`}
              onClick={() => onMudarCategoria(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <div className="filtro-grupo">
        <label htmlFor="filtro-preco">
          Preço até <strong>{Number(precoMaximo).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </label>
        <input
          id="filtro-preco"
          type="range"
          min="0"
          max={precoLimite}
          step="1"
          value={precoMaximo}
          onChange={(evento) => onMudarPreco(Number(evento.target.value))}
          className="filtro-preco-slider"
        />
        <div className="filtro-preco-limites">
          <span>R$ 0</span>
          <span>{Number(precoLimite).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
        </div>
      </div>

      <button className="filtro-limpar" onClick={onLimpar}>
        Limpar filtro
      </button>
    </div>
  );
}
