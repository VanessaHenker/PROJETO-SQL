import { useState } from "react";
import type { ProdutoFormData } from "../types/typesSQL";

interface FormProps {
  onSubmit: (produto: ProdutoFormData) => void | Promise<void>;
}

const Form = ({ onSubmit }: FormProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade_estoque, setQuantidadeEstoque] = useState("");
  const [imagemFile, setImagemFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const produto: ProdutoFormData = {
      nome,
      descricao,
      preco: preco ? parseFloat(preco) : undefined,
      quantidade_estoque: quantidade_estoque
        ? parseInt(quantidade_estoque)
        : undefined,
      imagem: imagemFile,
    };

    await onSubmit(produto);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade_estoque}
        onChange={(e) => setQuantidadeEstoque(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagemFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;
