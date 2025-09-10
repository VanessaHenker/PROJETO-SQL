import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Form from "./components/Form";
import Grid from "./components/Grid";

export interface Produto {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: string;
  imagem_url?: string | null;
}

const App = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editing, setEditing] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3001/produtos");
      const data = await res.json();
      // garante preco como number caso venha string
      const normalized = data.map((p: any) => ({ ...p, preco: Number(p.preco) }));
      setProdutos(normalized);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => { fetchProdutos(); }, []);

  const handleCreate = async (payload: Omit<Produto, "produto_id">) => {
    try {
      const res = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const created = await res.json();
      setProdutos(prev => [...prev, { ...created, preco: Number(created.preco) }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (payload: Produto) => {
    try {
      const res = await fetch(`http://localhost:3001/produtos/${payload.produto_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const updated = await res.json();
      setProdutos(prev => prev.map(p => p.produto_id === updated.produto_id ? { ...updated, preco: Number(updated.preco) } : p));
      setEditing(null);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (produto: Produto) => {
    if (!confirm(`Confirma excluir "${produto.nome}"?`)) return;
    try {
      const res = await fetch(`http://localhost:3001/produtos/${produto.produto_id}`, { method: "DELETE" });
      if (res.status === 204) setProdutos(prev => prev.filter(p => p.produto_id !== produto.produto_id));
      else throw new Error("Erro ao deletar");
    } catch (err) { console.error(err); }
  };

  return (
    <div className={styles.App}>
      <h1>Cadastro de Produtos</h1>
      <div>
        <Form
          produto={editing}
          onSubmit={(data) => {
            if (editing) handleUpdate({ ...editing, ...data, preco: Number(data.preco) });
            else handleCreate(data as Omit<Produto, "produto_id">);
          }}
          onCancel={() => setEditing(null)}
        />
        <Grid produtos={produtos} onEdit={(p) => setEditing(p)} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
