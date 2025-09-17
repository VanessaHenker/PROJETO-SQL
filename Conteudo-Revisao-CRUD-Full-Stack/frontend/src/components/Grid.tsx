import React from "react";
import type { Produto } from "../types/typesSQL";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (produtos.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Nenhum produto cadastrado.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {produtos.map((p) => (
        <li key={p.produto_id} style={{ marginBottom: "20px" }}>
          <strong>{p.nome}</strong> - R$ {p.preco.toFixed(2)}
          {p.imagem_url && (
            <div>
              <img
                src={p.imagem_url}
                alt={p.nome}
                style={{ width: "150px", marginTop: "10px" }}
              />
            </div>
          )}
          <button onClick={() => onDelete(p)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default Grid;
