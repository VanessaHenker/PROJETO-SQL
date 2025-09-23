import React, { useEffect, useState } from "react";
import styles from "../styles/form.module.css";

type ProdutoFormPayload = {
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  imagem_url: string | null;
};

type FormProps = {
  onSubmit: (formData: ProdutoFormPayload) => void | Promise<void>;
};

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // liberar URL de preview quando desmontar / quando mudar
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUploading(true);
    let imagem_url: string | null = null;

    try {
      if (imagemFile) {
        const fd = new FormData();
        fd.append("imagem", imagemFile);

        const res = await fetch(`${API}/upload`, {
          method: "POST",
          body: fd,
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Upload falhou: ${res.status} ${txt}`);
        }

        const data = await res.json();
        imagem_url = data.imagem_url ?? null; // ex: "/uploads/165...jpg"
      }

      await onSubmit({
        nome,
        descricao,
        preco: preco === "" ? 0 : Number(preco),
        quantidade_estoque: quantidade === "" ? 0 : Number(quantidade),
        imagem_url,
      });

      // reset
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setImagemFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required className={styles.input} />
      </div>

      <div className={styles.inputArea}>
        <label>Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className={styles.textarea} />
      </div>

      <div className={styles.inputArea}>
        <label>Preço (R$)</label>
        <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className={styles.input} />
      </div>

      <div className={styles.inputArea}>
        <label>Quantidade em Estoque</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required className={styles.input} />
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
          <img src={previewUrl} alt="Prévia" className={styles.previewImg} />
        </div>
      )}

      <button type="submit" className={styles.button} disabled={uploading}>
        {uploading ? "Enviando..." : "Salvar Produto"}
      </button>
    </form>
  );
};

export default Form;
