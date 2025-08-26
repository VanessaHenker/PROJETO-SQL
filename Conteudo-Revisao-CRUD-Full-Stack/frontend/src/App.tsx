import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Form from "./components/Form";
import Grid from "./components/Grid";

interface Produto {
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

  // Busca os produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:3000/produtos"); // ajuste a URL se necessário
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className={styles.App}>
      <h1>Cadastro de Produtos</h1>
      <div>
        <Form onSave={fetchProdutos} /> 
        <Grid produtos={produtos} onEdit={(p) => console.log("Editar", p)} onDelete={(p) => console.log("Excluir", p)} />
      </div>
    </div>
  );
};

export default App;
