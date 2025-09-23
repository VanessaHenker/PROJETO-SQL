import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "./types/typesSQL";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    const res = await fetch(`${API}/produtos`);
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const addProduto = async (produtoData: Omit<Produto, "produto_id" | "data_cadastro">) => {
    // cria data no formato SQL
    const agora = new Date().toISOString().slice(0, 19).replace("T", " ");
    const payload = { ...produtoData, data_cadastro: agora };

    const res = await fetch(`${API}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Erro ao salvar produto");

    const novo = await res.json();
    setProdutos((prev) => [...prev, novo]);
  };

  const deleteProduto = async (p: Produto) => {
    const res = await fetch(`${API}/produtos/${p.produto_id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir");
    setProdutos((prev) => prev.filter((x) => x.produto_id !== p.produto_id));
  };

  return (
    <div>
      <Form onSubmit={addProduto} />
      <Grid produtos={produtos} onDelete={deleteProduto} />
    </div>
  );
};

export default App;
