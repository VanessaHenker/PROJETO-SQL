import { useState } from "react";

const Form = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [produtos, setProdutos] = useState<any[]>([]);

  // Buscar produtos
  const fetchProdutos = async () => {
    const res = await fetch("http://localhost:3001/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  // Cadastrar produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("quantidade_estoque", quantidade);
    if (imagemFile) formData.append("imagem", imagemFile);

    const res = await fetch("http://localhost:3001/produtos", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await fetchProdutos();
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setImagemFile(null);
    } else {
      alert("Erro ao salvar produto");
    }
  };

  // Excluir produto
  const excluirProduto = async (id: number) => {
    const res = await fetch(`http://localhost:3001/produtos/${id}`, { method: "DELETE" });
    if (res.ok) fetchProdutos();
  };

  return (
    <div className="container">
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <input type="file" onChange={(e) => setImagemFile(e.target.files?.[0] || null)} />
        <button type="submit">Salvar Produto</button>
      </form>

      <h3>Lista de Produtos</h3>
      <div className="grid">
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado</p>
        ) : (
          produtos.map((p) => (
            <div key={p.produto_id} className="card">
              <img
                src={`http://localhost:3001${p.imagem_url}`}
                alt={p.nome}
                width="100"
                height="100"
              />
              <h4>{p.nome}</h4>
              <p>{p.descricao}</p>
              <p>
                <strong>R$ {p.preco}</strong>
              </p>
              <p>Estoque: {p.quantidade_estoque}</p>
              <p>Cadastro: {new Date(p.data_cadastro).toLocaleString()}</p>
              <button onClick={() => excluirProduto(p.produto_id)}>Excluir</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Form;


