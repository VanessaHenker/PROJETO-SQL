import styles from "../styles/form.module.css";

const Form = () => {
  return (
    <form className={styles.form}>
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

      <div className={styles.inputArea}>
        <label htmlFor="imagem">Imagem do Produto</label>
        <input id="imagem" name="imagem" type="file" accept="image/*" />
      </div>

      <button type="submit" className={styles.button}>Salvar</button>
    </form>
  );
};

export default Form;
