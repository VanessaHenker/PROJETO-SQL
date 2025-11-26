import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen, FaTrash, FaDollarSign, FaEdit } from "react-icons/fa";

interface GridProps {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
  onEdit: (produto: Produto) => void;
}

const DataCadastro: React.FC<{ data_cadastro?: string }> = ({ data_cadastro }) => {
  const [horaAtual, setHoraAtual] = React.useState("");

  React.useEffect(() => {
    if (!data_cadastro) {
      setHoraAtual("Data inválida");
      return;
    }

    try {
      let dataStr = String(data_cadastro).trim();
      dataStr = dataStr.replace("Z", "").split(".")[0];
      if (dataStr.includes(" ") && !dataStr.includes("T"))
        dataStr = dataStr.replace(" ", "T");

      const dataOriginal = new Date(dataStr);

      const dataCorrigida = new Date(dataOriginal.getTime() - 6 * 60 * 60 * 1000);

      const formatado = `${String(dataCorrigida.getDate()).padStart(2, "0")}/${String(
        dataCorrigida.getMonth() + 1
      ).padStart(2, "0")}/${dataCorrigida.getFullYear()}, ${String(
        dataCorrigida.getHours()
      ).padStart(2, "0")}:${String(dataCorrigida.getMinutes()).padStart(
        2,
        "0"
      )}:${String(dataCorrigida.getSeconds()).padStart(2, "0")}`;

      setHoraAtual(formatado);
    } catch {
      setHoraAtual("Data inválida");
    }
  }, [data_cadastro]);

  return <p className={styles.data}>Cadastrado em: {horaAtual}</p>;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete, onEdit }) => {
  if (!produtos.length) {
    return (
      <p className={styles.empty}>
        Nenhum produto cadastrado <FaBoxOpen />
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {produtos.map((produto) => (
        <div key={produto.produto_id} className={styles.card}>
          
          {/* Imagem do produto */}
          <div className={styles.imageArea}>
            <img
              src={
                produto.imagem_url
                  ? `http://localhost:3001/uploads/${produto.imagem_url}`
                  : "/img/sem-imagem.png"
              }
              alt={produto.nome || "Produto sem nome"}
              className={styles.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/img/sem-imagem.png";
              }}
            />
          </div>

          {/* Nome e descrição */}
          <h3 className={styles.nome}>{produto.nome || "Sem nome"}</h3>
          <p className={styles.descricao}>{produto.descricao || "Sem descrição"}</p>

          {/* Preço e estoque */}
          <div className={styles.infoRow}>
            <span className={styles.preco}>
              <FaDollarSign /> R$ {(produto.preco ?? 0).toFixed(2)}
            </span>
            <span className={styles.quantidade}>
              <FaBoxOpen /> {produto.quantidade_estoque ?? 0} em estoque
            </span>
          </div>

          {/* Data */}
          <DataCadastro data_cadastro={produto.data_cadastro} />

          {/* Botões */}
          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => onEdit(produto)}
            >
              <FaEdit /> Editar
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => onDelete(produto)}
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
