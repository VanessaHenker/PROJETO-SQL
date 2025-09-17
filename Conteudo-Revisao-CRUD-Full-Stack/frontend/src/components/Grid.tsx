import React from "react";
import type { Produto } from "../types/typesSQL";

type GridProps = {
  produtos: Produto[];
  onDelete: (produto: Produto) => void;
};

const Grid: React.FC<GridProps> = ({ produtos, onDelete }) => {
  if (produtos.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.produto_id}>
          <h3>{p.nome}</h3>
          <p><strong>Descrição:</strong> {p.descricao}</p>
          <p><strong>Preço:</strong> R$ {p.preco.toFixed(2)}</p>
          <p><strong>Quantidade em estoque:</strong> {p.quantidade_estoque}</p>

          {p.imagem_url && (
            <img
              src={p.imagem_url}
              alt={p.nome}
              width="150"
            />
          )}

          <button onClick={() => onDelete(p)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default Grid;
