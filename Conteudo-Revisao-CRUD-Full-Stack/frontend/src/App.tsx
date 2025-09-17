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

  // Adicionar produto
  const addProduto = async (produto: ProdutoFormData) => {
    try {
      // Preenche campos obrigatórios do backend se não vier do front
      const produtoCompleto = {
        ...produto,
        descricao: produto.descricao ?? "",
        quantidade_estoque: produto.quantidade_estoque ?? 0,
        data_cadastro: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
      };

      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoCompleto),
      });

      if (!res.ok) throw new Error("Erro ao salvar produto");
      const novoProduto = await res.json();

      // Atualiza estado local sem precisar chamar fetchProdutos
      setProdutos((prev) => [...prev, novoProduto]);
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
        <div className={styles.grid}>
          <Grid produtos={produtos} onDelete={deleteProduto} />
        </div>
      </div>
    </div>
  );
};

export default App;
