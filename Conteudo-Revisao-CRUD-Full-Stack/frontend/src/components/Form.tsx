import React, { useState } from "react";
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
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagemUrl: string | null = null;

    // Se houver imagem, faz upload pro backend
    if (imagemFile) {
      const formData = new FormData();
      formData.append("imagem", imagemFile);

      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Erro ao enviar imagem");
        return;
      }

      const data = await res.json();
      imagemUrl = data.imagem_url; // ex: "/uploads/169543245.png"
    }

    const agora = new Date().toLocaleString("pt-BR", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });

    await onSubmit({
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      imagem_url: imagemUrl,
      data_cadastro: agora,
    });

    // Resetar
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setImagemFile(null);
    setPreviewUrl(null);
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
          placeholder="Ex: Bolo de Chocolate"
        />
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className={styles.textarea}
          placeholder="Ex: Bolo fofinho"
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
            setImagemFile(file);
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }}
          className={styles.inputFile}
        />
      </div>

      {previewUrl && (
        <div className={styles.preview}>
          <img src={previewUrl} alt="Pré-visualização" className={styles.previewImg} />
        </div>
      )}

      <button type="submit" className={styles.button}>Salvar Produto</button>
    </form>
  );
};

export default Form;
