import React, { useRef } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  align-self: flex-end;
`;

const Form = () => {
  const ref = useRef();

  return (
    <FormContainer ref={ref}>
      <InputArea>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" type="text" />
      </InputArea>

      <InputArea>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </InputArea>

      <InputArea>
        <Label htmlFor="fone">Telefone</Label>
        <Input id="fone" name="fone" type="tel" />
      </InputArea>

      <InputArea>
        <Label htmlFor="dataNascimento">Data de nascimento</Label>
        <Input id="dataNascimento" name="dataNascimento" type="date" />
      </InputArea>

      <Button type="submit">Clique aqui</Button>
    </FormContainer>
  );
};

export default Form;
