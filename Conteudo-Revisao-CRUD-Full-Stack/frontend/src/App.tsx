import React, { useEffect, useState } from "react";
import Form from "./components/Form";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imageUrl: string | null;
};

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
  const addProduto = async (produto: { nome: string; preco: number; imageUrl: string | null }) => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Produtos</h1>
      <Form onSubmit={addProduto} />

      <h2>Lista de Produtos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {produtos.map((p) => (
          <li key={p.id} style={{ marginBottom: "20px" }}>
            <strong>{p.nome}</strong> - R$ {p.preco.toFixed(2)}
            {p.imageUrl && (
              <div>
                <img
                  src={p.imageUrl}
                  alt={p.nome}
                  style={{ width: "150px", marginTop: "10px" }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
