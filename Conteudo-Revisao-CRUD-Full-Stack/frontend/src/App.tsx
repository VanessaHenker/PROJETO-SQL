import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import type { ProdutoFormData } from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";
import styles from "./styles/app.module.css";

interface ProdutoComLoading extends Produto {
  isDeleting?: boolean; // controle do loading ao deletar
}

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<ProdutoComLoading[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // ================= BUSCAR PRODUTOS =================
  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3001/produtos");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data: Produto[] = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // ================= SALVAR OU ATUALIZAR =================
  const handleSubmit = async (formData: ProdutoFormData, produtoId?: number) => {
    try {
      if (produtoId) {
        // UPDATE
        const res = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Erro ao atualizar produto");

        const produtoAtualizado: Produto = await res.json();

        setProdutos((prev) =>
          prev.map((p) =>
            p.produto_id === produtoAtualizado.produto_id ? produtoAtualizado : p
          )
        );

        setProdutoEditando(null);
      } else {
        // CREATE
        const res = await fetch("http://localhost:3001/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Erro ao criar produto");

        const novoProduto: Produto = await res.json();
        setProdutos((prev) => [novoProduto, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EXCLUIR PRODUTO =================
  const deleteProduto = async (produto: ProdutoComLoading) => {
    if (!confirm(`Deseja realmente excluir o produto "${produto.nome}"?`)) return;

    // Marca como deletando para desabilitar o botão
    setProdutos((prev) =>
      prev.map((p) =>
        p.produto_id === produto.produto_id ? { ...p, isDeleting: true } : p
      )
    );

    try {
      const res = await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir produto");

      setProdutos((prev) =>
        prev.filter((p) => p.produto_id !== produto.produto_id)
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir produto");
      // Remove flag de deletando
      setProdutos((prev) =>
        prev.map((p) =>
          p.produto_id === produto.produto_id ? { ...p, isDeleting: false } : p
        )
      );
    }
  };

  // ================= EDITAR PRODUTO =================
  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
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
        <Grid
          produtos={produtos}
          onDelete={deleteProduto}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
