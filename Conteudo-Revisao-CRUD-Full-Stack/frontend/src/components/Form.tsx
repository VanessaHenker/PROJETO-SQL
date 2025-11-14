import React, { useState, useEffect } from "react";
import styles from "../styles/form.module.css";
import type { Produto } from "../types/typesSQL";

export type ProdutoFormData = Omit<Produto, "produto_id">;

type FormProps = {
  onSubmit: (
    formData: ProdutoFormData,
    produtoId?: number,
    novaImagem?: File | null
  ) => void | Promise<void>;
  produtoEditando?: Produto | null;
};

const Form: React.FC<FormProps> = ({ onSubmit, produtoEditando }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  // Novo estado: guardar arquivo de imagem verdadeiro
  const [novaImagem, setNovaImagem] = useState<File | null>(null);

  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome ?? "");
      setDescricao(produtoEditando.descricao ?? "");
      setPreco(produtoEditando.preco?.toString() ?? "");
      setQuantidade(produtoEditando.quantidade_estoque?.toString() ?? "");

      // IMPORTANTE: usar URL real, não blob
      setImagemPreview(produtoEditando.imagem_url || null);

      // editar produto → nenhuma imagem nova ainda
      setNovaImagem(null);
    } else {
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setImagemPreview(null);
      setNovaImagem(null);
    }
  }, [produtoEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const agora = new Date().toISOString();

    const formData: ProdutoFormData = {
      nome,
      descricao,
      preco: preco === "" ? 0 : Number(preco),
      quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),

      // IMPORTANTE:
      // Não envia blob!!
      imagem_url: produtoEditando?.imagem_url ?? "",

      data_cadastro: produtoEditando?.data_cadastro ?? agora,
    };

    onSubmit(formData, produtoEditando?.produto_id, novaImagem);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setNovaImagem(file);

      // Preview segura (não salva no banco)
      const previewURL = URL.createObjectURL(file);
      setImagemPreview(previewURL);

      // prevenir vazamento
      return () => URL.revokeObjectURL(previewURL);
    }
    setNovaImagem(null);
    setImagemPreview(null);
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
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="preco">Preço</label>
        <input
          id="preco"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="quantidade">Quantidade</label>
        <input
          id="quantidade"
          type="number"
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
          <img src={imagemPreview} alt="Pré-visualização" className={styles.previewImg} />
        </div>
      )}

      <button type="submit" className={styles.button}>
        {produtoEditando ? "Atualizar Produto" : "Salvar Produto"}
      </button>
    </form>
  );
};

export default Form;
