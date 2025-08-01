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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result);
      ref.current.reset();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" type="text" required />
      </InputArea>

      <InputArea>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required />
      </InputArea>

      <InputArea>
        <Label htmlFor="fone">Telefone</Label>
        <Input id="fone" name="fone" type="tel" required />
      </InputArea>

      <InputArea>
        <Label htmlFor="dataNascimento">Data de nascimento</Label>
        <Input id="dataNascimento" name="dataNascimento" type="date" required />
      </InputArea>

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default Form;
