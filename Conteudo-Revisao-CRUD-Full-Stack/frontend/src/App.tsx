import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import type { ProdutoFormData } from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";
import styles from "./styles/app.module.css";

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // Buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3001/produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar ou atualizar produto
  const handleSubmit = async (formData: ProdutoFormData, produtoId?: number) => {
    try {
      if (produtoId) {
        // Atualizar produto
        const res = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const produtoAtualizado = await res.json();

        setProdutos((prev) =>
          prev.map((p) =>
            p.produto_id === produtoAtualizado.produto_id
              ? produtoAtualizado
              : p
          )
        );

        setProdutoEditando(null);
      } else {
        // Criar produto
        const res = await fetch("http://localhost:3001/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const novoProduto = await res.json();
        setProdutos((prev) => [novoProduto, ...prev]);
      }
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  // Excluir produto
  const deleteProduto = async (produto: Produto) => {
    try {
      await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, { method: "DELETE" });
      setProdutos((prev) => prev.filter((p) => p.produto_id !== produto.produto_id));
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  };

  // Editar produto
  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>{produtoEditando ? "Editar Produto" : "Cadastro de Produtos"}</h1>
        <Form onSubmit={handleSubmit} produtoEditando={produtoEditando} />
      </div>

      <div className={styles.container}>
        <h2>Lista de Produtos</h2>
        <Grid produtos={produtos} onDelete={deleteProduto} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;