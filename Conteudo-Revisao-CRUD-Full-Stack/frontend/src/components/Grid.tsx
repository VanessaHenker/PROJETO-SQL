import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";

interface Produto {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  quantidade_estoque: number;
  data_cadastro: string;
  imagem_url?: string | null;
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
          <TableCell>Quantidade</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {produtos.map((produto) => (
          <TableRow key={produto.produto_id}>
            <TableCell>{produto.produto_id}</TableCell>
            <TableCell>{produto.nome}</TableCell>
            <TableCell>{produto.descricao}</TableCell>
            <TableCell>{Number(produto.preco).toFixed(2)}</TableCell>
            <TableCell>{produto.quantidade_estoque}</TableCell>
            <TableCell>{produto.data_cadastro ? new Date(produto.data_cadastro).toLocaleDateString() : ""}</TableCell>
            <TableCell>
              {onEdit && <Button size="small" onClick={() => onEdit(produto)}>Editar</Button>}
              {onDelete && <Button size="small" color="error" onClick={() => onDelete(produto)}>Excluir</Button>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Grid;
