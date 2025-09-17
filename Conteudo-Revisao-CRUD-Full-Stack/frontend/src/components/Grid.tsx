import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (produtos.length === 0) {
    return <p className={styles.empty}>Nenhum produto cadastrado.</p>;
  }

  return (
    <ul className={styles.grid}>
      {produtos.map((p) => (
        <li key={p.produto_id} className={styles.card}>
          <h3 className={styles.nome}>{p.nome}</h3>
          {p.imagem_url && (
            <img
              src={p.imagem_url}
              alt={p.nome}
              className={styles.image}
            />
          )}

          <p><strong>Descrição:</strong> {p.descricao}</p>
          <p><strong>Preço:</strong> R$ {p.preco.toFixed(2)}</p>
          <p><strong>Quantidade em estoque:</strong> {p.quantidade_estoque}</p>

          <button
            onClick={() => onDelete(p)}
            className={styles.button}
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Grid;
