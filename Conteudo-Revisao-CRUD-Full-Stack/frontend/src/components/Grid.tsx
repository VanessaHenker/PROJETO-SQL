import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: string;
}

interface GridProps {
  produtos: Produto[];
  onEdit?: (produto: Produto) => void;
  onDelete?: (produto: Produto) => void;
}

function Grid({ produtos, onEdit, onDelete }: GridProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Preço</TableCell>
          <TableCell>Quantidade em Estoque</TableCell>
          <TableCell>Data de Cadastro</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {produtos.map((produto) => (
          <TableRow key={produto.id}>
            <TableCell>{produto.id}</TableCell>
            <TableCell>{produto.nome}</TableCell>
            <TableCell>{produto.descricao}</TableCell>
            <TableCell>{produto.preco.toFixed(2)}</TableCell>
            <TableCell>{produto.quantidade_estoque}</TableCell>
            <TableCell>{produto.data_cadastro}</TableCell>
            <TableCell>
              {onEdit && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(produto)}
                  style={{ marginRight: 8 }}
                >
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(produto)}
                >
                  Excluir
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Grid;
