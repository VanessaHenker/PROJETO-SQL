import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBox } from "react-icons/fa"; 

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
          <div className={styles.imageWrapper}>
            {p.imagem_url && (
              <img src={p.imagem_url} alt={p.nome} className={styles.image} />
            )}
            <span className={styles.priceTag}>R$ {p.preco.toFixed(2)}</span>
          </div>

          <div className={styles.content}>
            <h3 className={styles.nome}>{p.nome}</h3>
            <p className={styles.descricao}>{p.descricao}</p>

            <div className={styles.meta}>
              <span className={styles.qty}>
                <FaBox className={styles.icon} /> {p.quantidade_estoque}
              </span>
              <span className={styles.date}>
                {new Date(p.data_cadastro).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          <button className={styles.button} onClick={() => onDelete(p)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Grid;
