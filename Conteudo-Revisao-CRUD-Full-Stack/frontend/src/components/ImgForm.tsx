import { useState, useRef } from "react";
import styles from "../styles/form.module.css";

function ImgForm() {
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
    </div>
  );
}

export default ImgForm;
