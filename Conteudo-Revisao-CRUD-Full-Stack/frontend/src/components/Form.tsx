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

  // Estado para imagem
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null); // preview local
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl: string | null = null;

    // Se tiver imagem, envia para backend primeiro
    if (file) {
      const formData = new FormData();
      formData.append("imagem", file);

      try {
        const res = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrl = data.imagem_url; // exemplo: "/uploads/16956712345.jpg"
        } else {
          console.error("Erro ao fazer upload da imagem");
        }
      } catch (error) {
        console.error("Erro na requisição de upload:", error);
      }
    }

    const agora = new Date().toISOString();

    await onSubmit({
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      imagem_url: uploadedUrl,
      data_cadastro: agora,
    });

    // Limpar formulário
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setFile(null);
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
          onChange={handleFileChange}
          className={styles.inputFile}
        />
      </div>

      {/* Preview da imagem */}
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
