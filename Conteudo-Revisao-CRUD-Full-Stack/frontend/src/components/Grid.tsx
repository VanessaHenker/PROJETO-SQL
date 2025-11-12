import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen, FaTrash, FaDollarSign, FaEdit, FaClock } from "react-icons/fa";

// -----------------------------
// Componente para exibir data de cadastro (fixa, sem relógio)
// -----------------------------
const DataCadastro: React.FC<{ data_cadastro?: string }> = ({ data_cadastro }) => {
  // Formata a data do produto para o padrão brasileiro
  const formatarData = (dataStr?: string) => {
    if (!dataStr) return "Data não informada";
    try {
      let dataFormatada = dataStr.trim();
      dataFormatada = dataFormatada.replace("Z", "").split(".")[0];
      if (dataFormatada.includes(" ") && !dataFormatada.includes("T"))
        dataFormatada = dataFormatada.replace(" ", "T");

      const data = new Date(dataFormatada);
      if (isNaN(data.getTime())) return "Data inválida";

      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const hora = String(data.getHours()).padStart(2, "0");
      const minuto = String(data.getMinutes()).padStart(2, "0");
      const segundo = String(data.getSeconds()).padStart(2, "0");

      return `${dia}/${mes}/${ano}, ${hora}:${minuto}:${segundo}`;
    } catch {
      return "Erro ao formatar data";
    }
  };

  return (
    <div className={styles.dataArea}>
      <p className={styles.data}>
        <FaClock /> Cadastrado em: {formatarData(data_cadastro)}
      </p>
    </div>
  );
};

// -----------------------------
// Grid principal
// -----------------------------
interface GridProps {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
  onEdit: (produto: Produto) => void;
}

const Grid: React.FC<GridProps> = ({ produtos, onDelete, onEdit }) => {
  if (!produtos.length)
    return (
      <p className={styles.empty}>
        Nenhum produto cadastrado <FaBoxOpen />
      </p>
    );

  return (
    <div className={styles.grid}>
      {produtos.map((p) => (
        <div key={p.produto_id} className={styles.card}>
          {/* Imagem */}
          <div className={styles.imageArea}>
            <img
              src={p.imagem_url || "/img/sem-imagem.png"}
              alt={p.nome || "Produto sem nome"}
              className={styles.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/img/sem-imagem.png";
              }}
            />
          </div>

          {/* Nome e descrição */}
          <h3 className={styles.nome}>{p.nome || "Sem nome"}</h3>
          <p className={styles.descricao}>{p.descricao || "Sem descrição"}</p>

          {/* Informações */}
          <div className={styles.infoRow}>
            <span className={styles.preco}>
              <FaDollarSign /> R$ {(p.preco ?? 0).toFixed(2)}
            </span>
            <span className={styles.quantidade}>
              <FaBoxOpen /> {p.quantidade_estoque ?? 0} em estoque
            </span>
          </div>

          {/* Data de cadastro */}
          <DataCadastro data_cadastro={p.data_cadastro} />

          {/* Botões */}
          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => onEdit(p)}
            >
              <FaEdit /> Editar
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => onDelete(p)}
            >
              <FaTrash /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
