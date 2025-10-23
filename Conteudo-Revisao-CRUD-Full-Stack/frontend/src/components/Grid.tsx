import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen } from "react-icons/fa";

interface GridProps {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
}

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (!produtos || produtos.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhum produto cadastrado <FaBoxOpen />
      </p>
    );
  }

  return (
    <section className={styles.grid}>
      {produtos.map((p) => (
        <article key={p.produto_id ?? p.nome} className={styles.card}>
          <figure className={styles.imageArea}>
            <img
              src={
                p.imagem_url && p.imagem_url.trim() !== ""
                  ? p.imagem_url
                  : "/img/sem-imagem.png"
              }
              alt={p.nome || "Produto sem nome"}
              className={styles.image}
              onError={(e) => {
                e.currentTarget.src = "/img/sem-imagem.png";
              }}
            />
          </figure>

          <div className={styles.info}>
            <h3 className={styles.title}>{p.nome || "Sem nome"}</h3>
            <p className={styles.desc}>{p.descricao || "Sem descrição"}</p>
            <p className={styles.price}>
              💰 <strong>Preço:</strong> R$ {(p.preco ?? 0).toFixed(2)}
            </p>
            <p className={styles.stock}>
              📦 <strong>Estoque:</strong> {p.quantidade_estoque ?? 0}
            </p>
            <p className={styles.date}>
              🗓️ <strong>Cadastrado em:</strong>{" "}
              {p.data_cadastro || "Data não informada"}
            </p>
          </div>

          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(p)}
            aria-label={`Excluir produto ${p.nome}`}
          >
            Excluir
          </button>
        </article>
      ))}
    </section>
  );
};

export default Grid;
