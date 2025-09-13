import React, { useState } from "react";
import styles from "../styles/form.module.css";

export type ProdutoFormData = {
  nome: string;
  preco: number;
  imagem_url: string | null;
};

type FormProps = {
  onSubmit: (formData: ProdutoFormData) => void | Promise<void>;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, preco, imagem_url: imagemUrl });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <label>Nome do Produto</label>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label>Preço</label>
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
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
            if (file) {
              const imagePreview = URL.createObjectURL(file);
              setImagemUrl(imagePreview);
            } else {
              setImagemUrl(null);
            }
          }}
          className={styles.inputFile}
        />
      </div>

      {imagemUrl && (
        <div className={styles.preview}>
          <img
            src={imagemUrl}
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
