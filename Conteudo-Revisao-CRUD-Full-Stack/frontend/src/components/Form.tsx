const Form = () => {
  return (
    <form className="form">
      <div className="input-area">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" />
      </div>

      <div className="input-area">
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" name="descricao" type="text" />
      </div>

      <div className="input-area">
        <label htmlFor="preco">Preço</label>
        <input id="preco" name="preco" type="number" step="0.01" />
      </div>

      <div className="input-area">
        <label htmlFor="quantidade_estoque">Quantidade em Estoque</label>
        <input id="quantidade_estoque" name="quantidade_estoque" type="number" />
      </div>

      <div className="input-area">
        <label htmlFor="data_cadastro">Data de Cadastro</label>
        <input id="data_cadastro" name="data_cadastro" type="date" />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;
