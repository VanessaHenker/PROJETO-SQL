import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen } from "react-icons/fa";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (!produtos.length) return <p className={styles.empty}>Nenhum produto cadastrado.</p>;

  function formatarDataBrasilia(dataISO: string) {
    const data = new Date(dataISO);
    data.setHours(data.getHours() - 3); // fuso horário Brasil
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Produtos Cadastrados <span className={styles.count}>({produtos.length})</span>
        </h2>
      </div>

      <ul className={styles.grid}>
        {produtos.map((p) => {
          const imageUrl = p.imagem_url ? `http://localhost:3001${p.imagem_url}` : null;

          return (
            <li key={p.produto_id} className={styles.card}>
              {imageUrl && <img src={imageUrl} alt={p.nome} className={styles.image} />}
              <h3 className={styles.nome}>{p.nome}</h3>
              <div className={styles.infoRow}>
                <span className={styles.preco}>R$ {p.preco.toFixed(2)}</span>
                <span className={styles.quantidade}>
                  <FaBoxOpen /> {p.quantidade_estoque}
                </span>
              </div>
              <p className={styles.descricao}>{p.descricao}</p>
              <span className={styles.data}>{formatarDataBrasilia(p.data_cadastro)}</span>
              <button className={styles.button} onClick={() => onDelete(p)}>
                Excluir
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Grid;
