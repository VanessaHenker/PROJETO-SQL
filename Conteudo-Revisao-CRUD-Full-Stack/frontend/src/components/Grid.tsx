import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen } from "react-icons/fa";

interface GridProps {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
}

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (!produtos.length)
    return (
      <p className={styles.empty}>
        Nenhum produto cadastrado <FaBoxOpen />
      </p>
    );

  return (
    <div className={styles.grid}>
      {produtos.map((p) => (
        <div key={p.produto_id ?? p.nome} className={styles.card}>
          <div className={styles.imageArea}>
            <img
              src={p.imagem_url ?? ""}
              alt={p.nome ?? "Produto sem nome"}
              className={styles.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/img/sem-imagem.png";
              }}
            />
          </div>

          <div className={styles.info}>
            <h3 className={styles.title}>{p.nome ?? "Sem nome"}</h3>
            <p className={styles.desc}>{p.descricao ?? "Sem descrição"}</p>
            <p className={styles.price}>
              Preço: R$ {(p.preco ?? 0).toFixed(2)}
            </p>
            <p className={styles.stock}>
              Estoque: {p.quantidade_estoque ?? 0}
            </p>
            <p className={styles.date}>
              Cadastrado em: {p.data_cadastro ?? "Data não informada"}
            </p>
          </div>

          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(p)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default Grid;
