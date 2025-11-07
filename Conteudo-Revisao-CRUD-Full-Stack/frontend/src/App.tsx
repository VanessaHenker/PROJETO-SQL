import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import type { ProdutoFormData } from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";
import styles from "./styles/app.module.css";

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // ================= BUSCAR PRODUTOS =================
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

  // ================= SALVAR OU ATUALIZAR =================
 const handleSubmit = async (formData: ProdutoFormData, produtoId?: number) => {
  console.log("Chamou handleSubmit:", formData, produtoId);
  if (!produtoId) {
  console.log("Tentando criar produto novo:", formData);
}

  try {
    if (produtoId) {
      // ======== EDITAR PRODUTO ========
      const res = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar produto");

      const produtoAtualizado = await res.json();
      console.log("Produto atualizado:", produtoAtualizado);

      setProdutos((prev) =>
        prev.map((p) =>
          p.produto_id === Number(produtoAtualizado.produto_id)
            ? produtoAtualizado
            : p
        )
      );

      setProdutoEditando(null);
    } else {
      // ======== CRIAR NOVO PRODUTO ========
      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao criar produto");

      const novoProduto = await res.json();
      console.log("Produto criado:", novoProduto);

      setProdutos((prev) => [novoProduto, ...prev]);
    }
  } catch (err) {
    console.error("Erro ao salvar produto:", err);
  }
};

  // ================= EXCLUIR PRODUTO =================
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
        <Grid produtos={produtos} onDelete={deleteProduto} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;