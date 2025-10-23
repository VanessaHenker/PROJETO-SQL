import { useState, useEffect } from "react";
import Form from "./components/Form";
import type { Produto, ProdutoFormData } from "./types/typesSQL";

const App = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    const res = await fetch("http://localhost:3001/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleAddProduto = async (produto: ProdutoFormData) => {
    try {
      const formData = new FormData();
      formData.append("nome", produto.nome);
      if (produto.descricao) formData.append("descricao", produto.descricao);
      if (produto.preco !== undefined)
        formData.append("preco", produto.preco.toString());
      if (produto.quantidade_estoque !== undefined)
        formData.append("quantidade_estoque", produto.quantidade_estoque.toString());
      if (produto.imagem) formData.append("imagem", produto.imagem);

      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao cadastrar produto");

      await fetchProdutos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Cadastro de Produtos</h1>
      <Form onSubmit={handleAddProduto} />

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado</p>
      ) : (
        produtos.map((p) => (
          <div key={p.produto_id}>
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <p>Preço: R${p.preco}</p>
            <p>Estoque: {p.quantidade_estoque}</p>
            {p.imagem_url && (
              <img
                src={`http://localhost:3001/${p.imagem_url}`}
                alt={p.nome}
                width="150"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default App;
