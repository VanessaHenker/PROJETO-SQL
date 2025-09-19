import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  const total = produtos.length;

  function formatarDataBrasilia(dataISO: string) {
    const data = new Date(dataISO);
    const offset = -3;
    data.setHours(data.getHours() + offset);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  if (!total) return <p className={styles.empty}>Nenhum produto cadastrado.</p>;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Lista de Produtos{" "}
          <span className={styles.count}>
            ({total} {total === 1 ? "produto" : "produtos"})
          </span>
        </h2>
      </div>

      <ul className={styles.grid}>
        {produtos.map((p, index) => (
          <li key={p.produto_id} className={styles.card}>
            <h3 className={styles.nome}>
              #{index + 1} — {p.nome}
            </h3>

            {p.imagem_url && (
              <img src={p.imagem_url} alt={p.nome} className={styles.image} />
            )}

            <div className={styles.details}>
              <div>
                <span>Descrição:</span> {p.descricao}
              </div>
              <div>
                <span>Preço:</span> R$ {p.preco.toFixed(2)}
              </div>
              <div>
                <span>Quantidade:</span> {p.quantidade_estoque}
              </div>
              <div className={styles.date}>
                <span>Data de cadastro:</span>{" "}
                {formatarDataBrasilia(p.data_cadastro)}
              </div>
            </div>

            <button className={styles.button} onClick={() => onDelete(p)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Grid;
