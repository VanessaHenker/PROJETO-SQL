// src/App.tsx
import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Form from "./components/Form";
import Grid from "./components/Grid";
import type { Produto } from "../src/types/typesSQL";

const App = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editing, setEditing] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3001/produtos");
      const data = await res.json();
      const normalized: Produto[] = (data || []).map((p: any) => ({
        produto_id: Number(p.produto_id),
        nome: p.nome ?? "",
        descricao: p.descricao ?? "",
        preco: Number(p.preco ?? 0),
        quantidade_estoque: Number(p.quantidade_estoque ?? 0),
        data_cadastro: p.data_cadastro ?? "",
        imagem_url: p.imagem_url ?? null,
      }));
      setProdutos(normalized);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleCreate = async (payload: Omit<Produto, "produto_id">) => {
    const body = {
      ...payload,
      preco: Number(payload.preco),
      quantidade_estoque: Number(payload.quantidade_estoque),
    };
    const res = await fetch("http://localhost:3001/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const created = await res.json();
    const normalized: Produto = {
      produto_id: Number(created.produto_id),
      nome: created.nome,
      descricao: created.descricao,
      preco: Number(created.preco),
      quantidade_estoque: Number(created.quantidade_estoque),
      data_cadastro: created.data_cadastro,
      imagem_url: created.imagem_url ?? null,
    };
    setProdutos((prev) => [...prev, normalized]);
  };

  const handleUpdate = async (payload: Produto) => {
    const body = {
      ...payload,
      preco: Number(payload.preco),
      quantidade_estoque: Number(payload.quantidade_estoque),
    };
    const res = await fetch(`http://localhost:3001/produtos/${payload.produto_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const updated = await res.json();
    const normalized: Produto = {
      produto_id: Number(updated.produto_id),
      nome: updated.nome,
      descricao: updated.descricao,
      preco: Number(updated.preco),
      quantidade_estoque: Number(updated.quantidade_estoque),
      data_cadastro: updated.data_cadastro,
      imagem_url: updated.imagem_url ?? null,
    };
    setProdutos((prev) => prev.map((p) => (p.produto_id === normalized.produto_id ? normalized : p)));
    setEditing(null);
  };

  const handleDelete = async (produto: Produto) => {
    if (!confirm(`Confirma excluir "${produto.nome}"?`)) return;
    await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, { method: "DELETE" });
    setProdutos((prev) => prev.filter((p) => p.produto_id !== produto.produto_id));
  };

  return (
    <div className={styles.App}>
      <h1>Cadastro de Produtos</h1>
      <div>
        <Form
          produto={editing}
          onSubmit={(data) => {
            if (editing) {
              // merging safe: editar usando os campos do form
              handleUpdate({
                ...editing,
                ...data,
                preco: Number(data.preco),
                quantidade_estoque: Number(data.quantidade_estoque),
              });
            } else {
              handleCreate({
                ...data,
                preco: Number(data.preco),
                quantidade_estoque: Number(data.quantidade_estoque),
              } as Omit<Produto, "produto_id">);
            }
          }}
          onCancel={() => setEditing(null)}
        />
        <Grid produtos={produtos} onEdit={(p) => setEditing(p)} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
