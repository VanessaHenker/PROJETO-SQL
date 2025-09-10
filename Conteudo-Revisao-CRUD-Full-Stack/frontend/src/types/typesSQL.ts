export type Produto = {
  produto_id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: string; 
  imagem_url?: string | null;
};
