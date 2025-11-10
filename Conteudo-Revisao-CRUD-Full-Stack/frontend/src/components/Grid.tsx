import React, { useState, useEffect } from "react";
import type { Produto } from "../types/typesSQL";
import styles from "../styles/grid.module.css";
import { FaBoxOpen, FaTrash, FaDollarSign, FaEdit } from "react-icons/fa";

interface GridProps {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
  onEdit: (produto: Produto) => void; 
}

// Componente para exibir a data corretamente com contador
const DataCadastro: React.FC<{ data_cadastro?: string }> = ({ data_cadastro }) => {
  const [horaAtual, setHoraAtual] = useState("");

  useEffect(() => {
    if (!data_cadastro) {
      setHoraAtual("Data inválida");
      return;
    }

    const atualizarHora = () => {
      try {
        let dataStr = String(data_cadastro).trim();

        // Remove frações e sufixos desnecessários
        dataStr = dataStr.replace("Z", "").split(".")[0];

        // Se estiver no formato "YYYY-MM-DD HH:mm:ss", converte para "T"
        if (dataStr.includes(" ") && !dataStr.includes("T")) {
          dataStr = dataStr.replace(" ", "T");
        }

        const [parteData, parteHora] = dataStr.split("T");
        if (!parteData) {
          setHoraAtual("Data inválida");
          return;
        }

        const [ano, mes, dia] = parteData.split("-").map(Number);
        const [hora = 0, minuto = 0, segundo = 0] = parteHora
          ? parteHora.split(":").map(Number)
          : [0, 0, 0];

        // Cria a data local sem usar UTC
        const dataLocal = new Date(ano, mes -1, dia, hora -3, minuto, segundo);

        // Ajusta para horário de Brasília (UTC-3)
        dataLocal.setHours(dataLocal.getHours() - 3);

        const diaStr = String(dataLocal.getDate()).padStart(2, "0");
        const mesStr = String(dataLocal.getMonth() + 1).padStart(2, "0");
        const anoStr = dataLocal.getFullYear();
        const horaStr = String(dataLocal.getHours()).padStart(2, "0");
        const minutoStr = String(dataLocal.getMinutes()).padStart(2, "0");
        const segundoStr = String(dataLocal.getSeconds()).padStart(2, "0");

        setHoraAtual(`${diaStr}/${mesStr}/${anoStr}, ${horaStr}:${minutoStr}:${segundoStr}`);
      } catch {
        setHoraAtual("Data inválida");
      }
    };

    atualizarHora(); // Atualiza imediatamente
    const interval = setInterval(atualizarHora, 1000); // Atualiza a cada segundo

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
        <div key={p.produto_id ?? p.nome} className={styles.card}>
          {/* Área da imagem */}
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

          {/* Nome e descrição */}
          <h3 className={styles.nome}>{p.nome ?? "Sem nome"}</h3>
          <p className={styles.descricao}>{p.descricao ?? "Sem descrição"}</p>

          {/* Informações de preço e estoque */}
          <div className={styles.infoRow}>
            <span className={styles.preco}>
              <FaDollarSign /> R$ {(p.preco ?? 0).toFixed(2)}
            </span>
            <span className={styles.quantidade}>
              <FaBoxOpen /> {p.quantidade_estoque ?? 0} em estoque
            </span>
          </div>

          {/* Data e hora de cadastro com contador */}
          <DataCadastro data_cadastro={p.data_cadastro} />

          {/* Botões */}
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => onEdit(p)}
            >
              <FaEdit /> Editar
            </button>
            <button
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
