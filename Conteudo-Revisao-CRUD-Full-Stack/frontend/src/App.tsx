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
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar ou editar produto
  const handleSubmit = async (formData: ProdutoFormData, produtoId?: number) => {
    try {
      if (produtoId) {
        const res = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Erro ao atualizar produto");

        const produtoAtualizado = await res.json();
        console.log("Produto atualizado:", produtoAtualizado);

        // Atualiza o Grid
        setProdutos(prev =>
          prev.map(p =>
            p.produto_id === Number(produtoAtualizado.produto_id)
              ? produtoAtualizado
              : p
          )
        );

        // Atualiza o Form com os dados atualizados
        setProdutoEditando({ ...produtoAtualizado });
      } else {
        // Código para criar novo produto...
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Excluir produto
  const deleteProduto = async (produto: Produto) => {
    try {
      const res = await fetch(
        `http://localhost:3001/produtos/${produto.produto_id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Erro ao excluir produto");

      setProdutos((prev) =>
        prev.filter((p) => p.produto_id !== produto.produto_id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Entrar em modo de edição
  const handleEdit = (produto: Produto) => {
    console.log("Produto para edição:", produto);
    setProdutoEditando({ ...produto }); // cria nova referência
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {produtoEditando ? "Editar Produto" : "Cadastro de Produtos"}
        </h1>
        <Form onSubmit={handleSubmit} produtoEditando={produtoEditando} />
      </div>

      <div className={styles.container}>
        <h2 className={styles.subtitle}>Lista de Produtos</h2>
        <Grid produtos={produtos} onDelete={deleteProduto} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;
