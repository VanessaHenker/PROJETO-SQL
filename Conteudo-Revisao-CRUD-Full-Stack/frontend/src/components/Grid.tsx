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

    const atualizarHora = () => {
      try {
        let dataStr = String(data_cadastro).trim();
        dataStr = dataStr.replace("Z", "").split(".")[0];
        if (dataStr.includes(" ") && !dataStr.includes("T")) dataStr = dataStr.replace(" ", "T");

        const [parteData, parteHora] = dataStr.split("T");
        const [ano, mes, dia] = parteData.split("-").map(Number);
        const [hora = 0, minuto = 0, segundo = 0] = parteHora ? parteHora.split(":").map(Number) : [0,0,0];

        const dataLocal = new Date(ano, mes - 1, dia, hora, minuto, segundo);

        setHoraAtual(
          `${String(dataLocal.getDate()).padStart(2, "0")}/${
            String(dataLocal.getMonth() + 1).padStart(2, "0")
          }/${dataLocal.getFullYear()}, ${String(dataLocal.getHours()).padStart(2,"0")}:${String(dataLocal.getMinutes()).padStart(2,"0")}:${String(dataLocal.getSeconds()).padStart(2,"0")}`
        );
      } catch {
        setHoraAtual("Data inválida");
      }
    };

    atualizarHora();
    const interval = setInterval(atualizarHora, 1000);
    return () => clearInterval(interval);
  }, [data_cadastro]);

  return <p className={styles.data}>Cadastrado em: {horaAtual}</p>;
};

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

          <h3 className={styles.nome}>{p.nome || "Sem nome"}</h3>
          <p className={styles.descricao}>{p.descricao || "Sem descrição"}</p>

          <div className={styles.infoRow}>
            <span className={styles.preco}>
              <FaDollarSign /> R$ {(p.preco ?? 0).toFixed(2)}
            </span>
            <span className={styles.quantidade}>
              <FaBoxOpen /> {p.quantidade_estoque ?? 0} em estoque
            </span>
          </div>

          <DataCadastro data_cadastro={p.data_cadastro} />

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
