import React, { useState } from "react";
import styles from "../styles/form.module.css";
import type { Produto } from "../types/typesSQL";

export type ProdutoFormData = Omit<Produto, "produto_id">;

type FormProps = {
  onSubmit: (formData: ProdutoFormData, imagemFile?: File | null) => void | Promise<void>;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemFile, setImagemFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const agora = new Date().toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const formData: ProdutoFormData = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
      imagem_url: imagemPreview ?? "",
      data_cadastro: agora,
    };

    // 👇 Agora o imagemFile é realmente utilizado
    if (imagemFile) {
      console.log("Arquivo selecionado:", imagemFile.name);
    }

    onSubmit(formData, imagemFile);

    // Resetar campos após envio
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
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={styles.input}
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
          className={styles.textarea}
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
          className={styles.input}
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
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="imagem">Imagem</label>
        <input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.inputFile}
        />
      </div>

      {imagemPreview && (
        <div className={styles.preview}>
          <img
            src={imagemPreview}
            alt="Pré-visualização da imagem"
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
