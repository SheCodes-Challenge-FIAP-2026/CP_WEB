import React, { useEffect, useMemo, useState } from "react";
import ProdutoCard from "../Componentes/ProdutoCard";
import Filtros from "../Componentes/Filtros";
import LoadingSpinner from "../Componentes/LoadingSpinner";
import "../css/Produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [precoMaximo, setPrecoMaximo] = useState(100);

  const precoLimite = 100;

  useEffect(() => {
    async function carregarProdutos() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(`${import.meta.env.BASE_URL}produtos.json`);
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        const dados = await resposta.json();
        setProdutos(dados);
        setPrecoMaximo(
          Math.max(...dados.map((produto) => produto.preco), 100)
        );
      } catch (erroRequisicao) {
        setErro(erroRequisicao.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  const categorias = useMemo(
    () => [...new Set(produtos.map((produto) => produto.categoria))],
    [produtos]
  );

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const combinaCategoria =
        categoriaAtiva === "Todas" || produto.categoria === categoriaAtiva;
      const combinaPreco = produto.preco <= precoMaximo;
      return combinaCategoria && combinaPreco;
    });
  }, [produtos, categoriaAtiva, precoMaximo]);

  function limparFiltros() {
    setCategoriaAtiva("Todas");
    setPrecoMaximo(precoLimite);
  }

  return (
    <div>
      <div className="pagina-produtos-cabecalho">
        <h1>Beleza e cuidados naturais</h1>
      </div>

      {!carregando && !erro && (
        <Filtros
          categorias={categorias}
          categoriaAtiva={categoriaAtiva}
          onMudarCategoria={setCategoriaAtiva}
          precoMaximo={precoMaximo}
          precoLimite={precoLimite}
          onMudarPreco={setPrecoMaximo}
          onLimpar={limparFiltros}
        />
      )}

      {carregando && <LoadingSpinner texto="Carregando produtos..." />}

      {erro && <div className="erro-carregamento">{erro}</div>}

      {!carregando && !erro && (
        <>

          {produtosFiltrados.length === 0 ? (
            <p className="sem-produtos">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          ) : (
            <div className="grade-produtos">
              {produtosFiltrados.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
