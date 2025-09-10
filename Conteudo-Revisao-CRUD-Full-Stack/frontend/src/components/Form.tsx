import { useEffect, useState } from "react";
import styles from "../styles/form.module.css";
import ImgForm from "./ImgForm";
import { Produto } from "../App";

type FormPayload = {
  nome: string;
  descricao?: string;
  preco: number | string;
  quantidade_estoque: number | string;
  data_cadastro: string;
  imagem_url?: string | null;
};

interface Props {
  produto?: Produto | null;
  onSubmit: (payload: FormPayload) => void;
  onCancel?: () => void;
}

const Form = ({ produto, onSubmit, onCancel }: Props) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome ?? "");
      setDescricao(produto.descricao ?? "");
      setPreco(String(produto.preco ?? ""));
      setQuantidade(String(produto.quantidade_estoque ?? ""));
      setDataCadastro(produto.data_cadastro ? produto.data_cadastro.split("T")[0] : "");
      setImagemUrl(produto.imagem_url ?? null);
    } else {
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setDataCadastro("");
      setImagemUrl(null);
    }
  }, [produto]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) { alert("Nome obrigatório"); return; }
    onSubmit({
      nome,
      descricao,
      preco: Number(preco),
      quantidade_estoque: Number(quantidade),
      data_cadastro: dataCadastro,
      imagem_url: imagemUrl,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ImgForm imageUrl={imagemUrl} onChange={setImagemUrl} />
      <div className={styles.inputArea}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div className={styles.inputArea}>
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
      </div>
      <div className={styles.inputArea}>
        <label htmlFor="preco">Preço</label>
        <input id="preco" type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} />
      </div>
      <div className={styles.inputArea}>
        <label htmlFor="quantidade_estoque">Quantidade</label>
        <input id="quantidade_estoque" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
      </div>
      <div className={styles.inputArea}>
        <label htmlFor="data_cadastro">Data</label>
        <input id="data_cadastro" type="date" value={dataCadastro} onChange={e => setDataCadastro(e.target.value)} />
      </div>
      <button type="submit" className={styles.button}>Salvar</button>
      {produto && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default Form;
