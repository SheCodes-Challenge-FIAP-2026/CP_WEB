import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "../css/Avaliacoes.css";

const URL_API_FALSA = "https://jsonplaceholder.typicode.com/comments?_limit=3";

const DEPOIMENTOS = [
  {
    texto:
      "Amei a proposta da marca! O produto tem uma qualidade incrível e saber que a embalagem é sustentável me faz sentir que estou fazendo uma escolha melhor para o meio ambiente.",
    autor: "Mariana, 24 anos",
  },
  {
    texto:
      "O que mais gostei foi a combinação de sustentabilidade com praticidade. O produto entrou facilmente na minha rotina e ainda tem uma apresentação linda e moderna.",
    autor: "Beatriz, 29 anos",
  },
  {
    texto:
      "Sempre tive dificuldade em encontrar produtos de beleza que fossem realmente alinhados com um consumo mais consciente. Gostei muito da experiência e com certeza compraria novamente.",
    autor: "Camila, 32 anos",
  },
];

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarAvaliacoes() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(URL_API_FALSA);
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as avaliações no momento.");
        }
        const dados = await resposta.json();
        setAvaliacoes(
          dados.map((comentario, indice) => ({
            id: comentario.id,
            autor: DEPOIMENTOS[indice]?.autor ?? "Cliente Pétala",
            texto: DEPOIMENTOS[indice]?.texto ?? comentario.body,
          }))
        );
      } catch (erroRequisicao) {
        setErro(erroRequisicao.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarAvaliacoes();
  }, []);

  return (
    <section className="avaliacoes">
      <h2 className="avaliacoes-titulo">Feedbacks dos clientes</h2>

      {carregando && <LoadingSpinner texto="Carregando avaliações..." />}

      {erro && <div className="erro-carregamento">{erro}</div>}

      {!carregando && !erro && (
        <div className="avaliacoes-grade">
          {avaliacoes.map((avaliacao) => (
            <article className="avaliacao-card" key={avaliacao.id}>
              <div className="avaliacao-estrelas" aria-hidden="true">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="avaliacao-texto">"{avaliacao.texto}"</p>
              <span className="avaliacao-autor">— {avaliacao.autor}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
