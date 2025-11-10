import React, { useState, useEffect } from "react";
import styles from "../styles/form.module.css";
import type { Produto } from "../types/typesSQL";

export type ProdutoFormData = Omit<Produto, "produto_id">;

type FormProps = {
  onSubmit: (formData: ProdutoFormData, produtoId?: number) => void | Promise<void>;
  produtoEditando?: Produto | null;
};

const Form: React.FC<FormProps> = ({ onSubmit, produtoEditando }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  // Preenche os campos quando seleciona produto para edição
  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome ?? "");
      setDescricao(produtoEditando.descricao ?? "");
      setPreco(produtoEditando.preco?.toString() ?? "");
      setQuantidade(produtoEditando.quantidade_estoque?.toString() ?? "");
      setImagemPreview(produtoEditando.imagem_url ?? null);
    } else {
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setImagemPreview(null);
    }
  }, [produtoEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ProdutoFormData = {
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      imagem_url: imagemPreview ?? produtoEditando?.imagem_url ?? "",
      data_cadastro: produtoEditando?.data_cadastro ?? new Date().toISOString(),
    };

    onSubmit(formData, produtoEditando?.produto_id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagemPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder="Ex: Bolo de Chocolate"
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          placeholder="Ex: Bolo fofinho com cobertura"
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="preco">Preço (R$)</label>
        <input
          id="preco"
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="quantidade">Quantidade em Estoque</label>
        <input
          id="quantidade"
          type="number"
          min="0"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="imagem">Imagem</label>
        <input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {imagemPreview && (
        <div className={styles.preview}>
          <img src={imagemPreview} alt="Preview" className={styles.previewImg} />
        </div>
      )}

      <button type="submit">
        {produtoEditando ? "Atualizar Produto" : "Salvar Produto"}
      </button>
    </form>
  );
};

export default Form;
