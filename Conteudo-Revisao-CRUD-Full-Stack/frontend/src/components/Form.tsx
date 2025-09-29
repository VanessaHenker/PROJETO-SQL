import React, { useState, useEffect } from "react";
import styles from "../styles/form.module.css";
import type { Produto } from "../types/typesSQL";

export type ProdutoFormData = Omit<Produto, "produto_id">;

type FormProps = {
  onSubmit: (formData: ProdutoFormData) => void | Promise<void>;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagem_url = "";

    // Upload de imagem separado
    if (imagem) {
      const formData = new FormData();
      formData.append("imagem", imagem);

      const resUpload = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (resUpload.ok) {
        const data = await resUpload.json();
        imagem_url = data.imagem_url;
      } else {
        console.error("Erro ao enviar imagem");
      }
    }

    const produto: ProdutoFormData = {
      nome,
      descricao,
      preco: parseFloat(preco),
      quantidade_estoque: parseInt(quantidade, 10),
      imagem_url,
      data_cadastro: new Date().toISOString(),
    };

    // Salva no backend
    const res = await fetch("http://localhost:3001/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!res.ok) {
      console.error("Erro ao salvar produto");
      return;
    }

    const novoProduto = await res.json();

    // Dispara callback
    await onSubmit(novoProduto);

    // Resetar formulário
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setImagem(null);
    setPreview(null);
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
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Preço (R$)</label>
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Quantidade em Estoque</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Imagem</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImagem(file);
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className={styles.inputFile}
        />
      </div>

      {preview && (
        <div className={styles.preview}>
          <img
            src={preview}
            alt="Pré-visualização"
            className={styles.previewImg}
          />
        </div>
      )}

      <button type="submit" className={styles.button}>
        Salvar Produto
      </button>
    </form>
  );
};

export default Form;
