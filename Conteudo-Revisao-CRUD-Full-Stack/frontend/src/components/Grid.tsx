import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen, FaTrash, FaDollarSign } from "react-icons/fa";

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

          <h3 className={styles.nome}>{p.nome ?? "Sem nome"}</h3>
          <p className={styles.descricao}>{p.descricao ?? "Sem descrição"}</p>

          <div className={styles.infoRow}>
            <span className={styles.preco}>
              <FaDollarSign /> R$ {(p.preco ?? 0).toFixed(2)}
            </span>
            <span className={styles.quantidade}>
              <FaBoxOpen /> {p.quantidade_estoque ?? 0} em estoque
            </span>
          </div>

          <p className={styles.data}>
            Cadastrado em:{" "}
            {p.data_cadastro
              ? new Date(p.data_cadastro).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Forçando o formato de 24 horas
                })
              : "Data inválida"}
          </p>

          <button
            className={styles.button}
            onClick={() => onDelete(p)}
          >
            <FaTrash /> Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default Grid;
