import React from "react";
import { FormContainer, InputArea, Label, Input, Button } from "./form.css"; 

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
        <Input id="preco" name="preco" type="number" />
      </InputArea>

      <InputArea>
        <Label htmlFor="quantidade">Quantidade</Label>
        <Input id="quantidade" name="quantidade" type="number" />
      </InputArea>

      <InputArea>
        <Label htmlFor="cadastro">Data de cadastro</Label>
        <Input id="cadastro" name="cadastro" type="date" />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
