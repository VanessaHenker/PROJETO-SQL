import React, { useState } from "react";

// Definindo as props que o Form aceita
export type ProdutoFormData = {
  nome: string;
  preco: number;
  imageUrl: string | null;
};

type FormProps = {
  onSubmit: (formData: ProdutoFormData) => void | Promise<void>;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, preco, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(Number(e.target.value))}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            const imagePreview = URL.createObjectURL(file);
            setImageUrl(imagePreview);
          } else {
            setImageUrl(null);
          }
        }}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Pré-visualização"
          style={{ width: "200px", height: "auto", marginTop: "10px" }}
        />
      )}

      <button type="submit">Salvar Produto</button>
    </form>
  );
};

export default Form;
