import React, { useEffect, useState } from "react";
import type { ProdutoFormData } from "./components/Form";
import Form from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";
import styles from "./styles/app.module.css"; 

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

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

  // Adicionar produto
  const addProduto = async (produto: ProdutoFormData) => {
    try {
      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (res.ok) {
        fetchProdutos();
      } else {
        console.error("Erro ao salvar produto");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  // Excluir produto
  const deleteProduto = async (produto: Produto) => {
    try {
      const res = await fetch(
        `http://localhost:3001/produtos/${produto.produto_id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        fetchProdutos();
      } else {
        console.error("Erro ao excluir produto");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Cadastro de Produtos</h1>
      <Form onSubmit={addProduto} />

      <h2 className={styles.subtitle}>Lista de Produtos</h2>
      <div className={styles.grid}>
        <Grid produtos={produtos} onDelete={deleteProduto} />
      </div>
    </div>
  );
};

export default App;
