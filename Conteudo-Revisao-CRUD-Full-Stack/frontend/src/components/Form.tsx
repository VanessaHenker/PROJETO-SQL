import React, { useState } from "react";
import styles from "../styles/form.module.css";
import type { Produto } from "../types/typesSQL";

export type ProdutoFormData = Omit<Produto, "produto_id">;

type FormProps = {
  onSubmit: (formData: FormData) => void | Promise<void>;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco || "0");
    formData.append("quantidade_estoque", quantidade || "0");
    if (imagemFile) formData.append("imagem", imagemFile);

    onSubmit(formData);

    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setImagemFile(null);
    setImagemPreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagemFile(file);
    setImagemPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder="Ex: Bolo de Chocolate"
        />
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Bolo fofinho com cobertura"
        />
      </div>

      <div className={styles.inputArea}>
        <label>Preço (R$)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputArea}>
        <label>Quantidade em Estoque</label>
        <input
          type="number"
          min="0"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputArea}>
        <label>Imagem</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {imagemPreview && (
        <div className={styles.preview}>
          <img src={imagemPreview} alt="Pré-visualização" />
        </div>
      )}

      <button type="submit" className={styles.button}>
        Salvar Produto
      </button>
    </form>
  );
};

export default Form;
