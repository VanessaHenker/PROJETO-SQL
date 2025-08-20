import React from "react";
import { FormContainer, InputArea, Label, Input, Button } from "../styles/FormStyles";

const Form: React.FC = () => {
  return (
    <FormContainer>
      <InputArea>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" type="text" />
      </InputArea>

      <InputArea>
        <Label htmlFor="descricao">Descrição</Label>
        <Input id="descricao" name="descricao" type="text" />
      </InputArea>

      <InputArea>
        <Label htmlFor="preco">Preço</Label>
        <Input id="preco" name="preco" type="number" step="0.01" />
      </InputArea>

      <InputArea>
        <Label htmlFor="quantidade_estoque">Quantidade em Estoque</Label>
        <Input id="quantidade_estoque" name="quantidade_estoque" type="number" />
      </InputArea>

      <InputArea>
        <Label htmlFor="data_cadastro">Data de Cadastro</Label>
        <Input id="data_cadastro" name="data_cadastro" type="date" />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
