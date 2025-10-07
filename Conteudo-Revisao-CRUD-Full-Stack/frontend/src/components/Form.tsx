import React, { useState } from "react";
import type { ProdutoFormData } from "../types/typesSQL";
import styles from "../styles/form.module.css";

interface FormProps {
  onSubmit: (produto: ProdutoFormData) => void | Promise<void>;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setArquivo(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagem_url: string | undefined;

    if (arquivo) {
      const formData = new FormData();
      formData.append("imagem", arquivo);

      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imagem_url = data.imagem_url; // agora é string | undefined
    }

    const agora = new Date().toISOString().slice(0, 19).replace("T", " ");

    await onSubmit({
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      data_cadastro: agora,
      imagem_url,
    });

    // Resetar formulário
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setArquivo(null);
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
          placeholder="Ex: Bolo de Chocolate"
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          placeholder="Ex: Bolo fofinho"
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
          onChange={handleImageChange}
          className={styles.inputFile}
        />
      </div>

      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Pré-visualização" className={styles.previewImg} />
        </div>
      )}

      <button type="submit" className={styles.button}>
        Salvar Produto
      </button>
    </form>
  );
};

export default Form;
