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
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const agora = new Date().toISOString().slice(0, 19).replace("T", " "); // formato MySQL

    onSubmit({
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      imagem_url: imagemUrl,
      data_cadastro: agora,
    });

    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setImagemUrl(null);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("imagem", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro no upload da imagem");

      const data = await res.json();
      setImagemUrl(data.imagem_url); // salva o caminho do backend
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={styles.input} placeholder="Ex: Bolo de Chocolate"/>
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className={styles.textarea} placeholder="Ex: Bolo fofinho"/>
      </div>

      <div className={styles.inputArea}>
        <label>Preço (R$)</label>
        <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className={styles.input}/>
      </div>

      <div className={styles.inputArea}>
        <label>Quantidade em Estoque</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required className={styles.input}/>
      </div>

      <div className={styles.inputArea}>
        <label>Imagem</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className={styles.inputFile}
        />
      </div>

      {imagemUrl && (
        <div className={styles.preview}>
          <img
            src={`http://localhost:3001${imagemUrl}`}
            alt="Pré-visualização"
            className={styles.previewImg}
          />
        </div>
      )}

      <button type="submit" className={styles.button}>Salvar Produto</button>
    </form>
  );
};

export default Form;
