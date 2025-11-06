import React, { useEffect, useState } from "react";
import Form, { ProdutoFormData } from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";
import styles from "./styles/app.module.css";

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // Buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:3001/produtos");
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar ou atualizar produto
  const handleSubmit = async (formData: ProdutoFormData, produtoId?: number) => {
    try {
      if (produtoId) {
        // 🔧 EDIÇÃO: PATCH para atualizar o produto
        const response = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Erro ao atualizar produto");
        console.log("Produto atualizado com sucesso!");

      } else {
        // 🔧 CRIAÇÃO: POST para criar novo produto
        const response = await fetch("http://localhost:3001/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Erro ao criar produto");
        console.log("Produto criado com sucesso!");
      }

      // Atualiza lista e limpa edição
      await fetchProdutos();
      setProdutoEditando(null);
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
    }
  };

  // Deletar produto
  const handleDelete = async (produto: Produto) => {
    try {
      const response = await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir produto");

      await fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Produtos</h1>

      <Form onSubmit={handleSubmit} produtoEditando={produtoEditando} />

      <Grid
        produtos={produtos}
        onDelete={handleDelete}
        onEdit={(produto) => setProdutoEditando(produto)} // <-- ativa modo edição
      />
    </div>
  );
};

export default App;
