import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Grid from "./components/Grid";
import type { Produto, ProdutoFormData } from "./types/typesSQL";
import styles from "./styles/app.module.css";

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

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

  const addProduto = async (produto: ProdutoFormData) => {
    try {
      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
      if (!res.ok) throw new Error("Erro ao salvar produto");
      const novoProduto = await res.json();
      setProdutos((prev) => [...prev, novoProduto]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduto = async (produto: Produto) => {
    try {
      const res = await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir produto");
      setProdutos((prev) => prev.filter((p) => p.produto_id !== produto.produto_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Produtos</h1>
        <Form onSubmit={addProduto} />
      </div>

      <div className={styles.container}>
        <h2 className={styles.subtitle}>Lista de Produtos</h2>
        <Grid produtos={produtos} onDelete={deleteProduto} />
      </div>
    </div>
  );
};

export default App;
