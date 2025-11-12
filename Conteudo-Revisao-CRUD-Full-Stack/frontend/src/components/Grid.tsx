import React from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen, FaTrash, FaDollarSign, FaEdit, FaClock } from "react-icons/fa";

// -----------------------------
// Componente para exibir data de cadastro + hora oficial de Brasília
// -----------------------------
const DataCadastro: React.FC<{ data_cadastro?: string }> = ({ data_cadastro }) => {
  const [horaOficial, setHoraOficial] = React.useState("Carregando...");
  const [dataProduto, setDataProduto] = React.useState("Data inválida");

  // Atualiza data de cadastro do produto
  React.useEffect(() => {
    if (!data_cadastro) return;

    try {
      let dataStr = String(data_cadastro).trim();
      dataStr = dataStr.replace("Z", "").split(".")[0];
      if (dataStr.includes(" ") && !dataStr.includes("T")) dataStr = dataStr.replace(" ", "T");

      const data = new Date(dataStr);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const hora = String(data.getHours()).padStart(2, "0");
      const minuto = String(data.getMinutes()).padStart(2, "0");
      const segundo = String(data.getSeconds()).padStart(2, "0");

      setDataProduto(`${dia}/${mes}/${ano}, ${hora}:${minuto}:${segundo}`);
    } catch {
      setDataProduto("Data inválida");
    }
  }, [data_cadastro]);

  // Atualiza hora oficial de Brasília a cada segundo
  React.useEffect(() => {
    const fetchHora = async () => {
      try {
        const res = await fetch("https://worldtimeapi.org/api/timezone/America/Sao_Paulo");
        const data = await res.json();
        const date = new Date(data.datetime);

        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        const hora = String(date.getHours()).padStart(2, "0");
        const minuto = String(date.getMinutes()).padStart(2, "0");
        const segundo = String(date.getSeconds()).padStart(2, "0");

        setHoraOficial(`${dia}/${mes}/${ano}, ${hora}:${minuto}:${segundo}`);
      } catch {
        setHoraOficial("Erro ao carregar hora oficial");
      }
    };

    fetchHora();
    const interval = setInterval(fetchHora, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dataArea}>
      <p className={styles.data}>
        <FaClock /> Cadastrado em: {dataProduto}
      </p>
      <p className={styles.horaOficial}>
        ⏱️ Hora oficial (Brasília): {horaOficial}
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

          {/* Data e hora oficial */}
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
