export interface Produto {
  produto_id: number;
  nome: string;
  descricao?: string;
  preco?: number;
  quantidade_estoque?: number;
  data_cadastro?: string;
  imagem_url?: string;
}

// Dados usados no formulário (sem ID e aceitando File)
export interface ProdutoFormData {
  nome: string;
  descricao?: string;
  preco?: number;
  quantidade_estoque?: number;
  imagem?: File | null;
}
