import { useState, useRef } from "react";
import styles from "../styles/form.module.css";

const Form = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Seleção de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Editar imagem
  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <form className={styles.form}>
      {/* Campo de imagem no topo */}
      <div className={styles.inputArea}>
        <input
          ref={fileInputRef}
          id="imagem"
          name="imagem"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {!preview && (
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar Imagem
          </button>
        )}
      </div>

      {/* Preview da imagem */}
      {preview && (
        <div className={styles.preview}>
          <img className={styles.previewImg} src={preview} alt="Preview" />
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={`${styles.buttonSecondary} ${styles.edit}`}
              onClick={handleEditImage}
            >
              Editar
            </button>
            <button
              type="button"
              className={`${styles.buttonSecondary} ${styles.delete}`}
              onClick={handleRemoveImage}
            >
              Excluir
            </button>
          </div>
        </div>
      )}

      {/* Campos do formulário */}
      <div className={styles.inputArea}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" name="descricao" type="text" />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="preco">Preço</label>
        <input id="preco" name="preco" type="number" step="0.01" />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="quantidade_estoque">Quantidade em Estoque</label>
        <input id="quantidade_estoque" name="quantidade_estoque" type="number" />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="data_cadastro">Data de Cadastro</label>
        <input id="data_cadastro" name="data_cadastro" type="date" />
      </div>

      <button type="submit" className={styles.button}>
        Salvar
      </button>
    </form>
  );
};

export default Form;
