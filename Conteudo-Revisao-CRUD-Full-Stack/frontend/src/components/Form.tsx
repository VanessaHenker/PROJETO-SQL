// src/components/Form.tsx
import { useEffect, useState } from "react";
import styles from "../styles/form.module.css";
import ImgForm from "./ImgForm";
import type { Produto } from "../types/typesSQL";
import type { FormEvent } from "react";

type FormPayload = Omit<Produto, "produto_id">;

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      alert("Nome obrigatório");
      return;
    }
    onSubmit({
      nome,
      descricao,
      preco: Number(preco),
      quantidade_estoque: Number(quantidade),
      data_cadastro: dataCadastro,
      imagem_url: imagemUrl ?? null,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ImgForm imageUrl={imagemUrl} onChange={setImagemUrl} />

      <div className={styles.inputArea}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="preco">Preço</label>
        <input id="preco" name="preco" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="quantidade_estoque">Quantidade em Estoque</label>
        <input id="quantidade_estoque" name="quantidade_estoque" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </div>

      <div className={styles.inputArea}>
        <label htmlFor="data_cadastro">Data de Cadastro</label>
        <input id="data_cadastro" name="data_cadastro" type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} />
      </div>

      <button type="submit" className={styles.button}>
        Salvar
      </button>
      {produto && (
        <button type="button" onClick={onCancel} className={styles.button}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default Form;
