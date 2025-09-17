import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (!produtos.length) return <p className={styles.empty}>Nenhum produto cadastrado.</p>;

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

  return (
    <ul className={styles.grid}>
      {produtos.map((p) => (
        <li key={p.produto_id} className={styles.card}>
          <h3 className={styles.nome}>{p.nome}</h3>
          {p.imagem_url && <img src={p.imagem_url} alt={p.nome} className={styles.image} />}
          <p><strong>Descrição:</strong> {p.descricao}</p>
          <p><strong>Preço:</strong> R$ {p.preco.toFixed(2)}</p>
          <p><strong>Quantidade:</strong> {p.quantidade_estoque}</p>
          <p><strong>Data de cadastro:</strong> {formatarDataBrasilia(p.data_cadastro)}</p>
          <button className={styles.button} onClick={() => onDelete(p)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default Grid;
