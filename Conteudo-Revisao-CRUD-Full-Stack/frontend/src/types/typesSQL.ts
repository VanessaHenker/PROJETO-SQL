export interface Produto {
  produto_id: number;
  nome: string;
  descricao?: string;
  preco?: number;
  quantidade_estoque?: number;
  data_cadastro?: string;
  imagem_url?: string;
}

export type ProdutoFormData = Omit<Produto, "produto_id">;
