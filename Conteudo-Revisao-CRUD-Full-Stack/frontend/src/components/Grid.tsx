import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (!produtos.length) return <p className={styles.empty}>Nenhum produto cadastrado.</p>;

  return (
    <ul className={styles.grid}>
      {produtos.map((p) => {
        const imgSrc =
          p.imagem_url && (p.imagem_url.startsWith("http") ? p.imagem_url : `${API}${p.imagem_url}`);
        return (
          <li key={p.produto_id} className={styles.card}>
            {imgSrc && <img src={imgSrc} alt={p.nome} className={styles.image} />}
            <h3 className={styles.nome}>{p.nome}</h3>
            <div className={styles.infoRow}>
              <span className={styles.preco}>R$ {p.preco.toFixed(2)}</span>
              <span className={styles.quantidade}><FaBoxOpen /> {p.quantidade_estoque}</span>
            </div>
            <p className={styles.descricao}>{p.descricao}</p>
            <span className={styles.data}>{new Date(p.data_cadastro).toLocaleString()}</span>
            <button onClick={() => onDelete(p)} className={styles.button}>Excluir</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Grid;
