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
      // ======== ATUALIZAR PRODUTO EXISTENTE ========
      const res = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar produto");

      const produtoAtualizado = await res.json();
      console.log("Produto atualizado:", produtoAtualizado);

      // Atualiza a lista no grid
      setProdutos((prev) =>
        prev.map((p) =>
          p.produto_id === Number(produtoAtualizado.produto_id)
            ? produtoAtualizado
            : p
        )
      );

      // ✅ Limpa o formulário e volta ao modo de cadastro
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

      // Atualiza o grid com o novo produto no topo
      setProdutos((prev) => [novoProduto, ...prev]);
    }
  } catch (err) {
    console.error("Erro ao salvar produto:", err);
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
