import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

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
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline-color: #2c73d2;
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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const form = ref.current;
      form.nome.value = onEdit.nome || "";
      form.email.value = onEdit.email || "";
      form.fone.value = onEdit.fone || "";
      form.data_nascimento.value = onEdit.data_nascimento
        ? onEdit.data_nascimento.split("T")[0]
        : "";
    } else {
      ref.current.reset();
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());

    if (!data.nome || !data.email || !data.fone || !data.data_nascimento) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const url = onEdit
        ? `http://localhost:3001/usuarios/${onEdit.id}`
        : "http://localhost:3001/usuarios";

      const method = onEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao salvar usuário");

      toast.success(onEdit ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");

      ref.current.reset();
      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error(error.message || "Erro ao salvar usuário.");
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
        <Label htmlFor="data_nascimento">Data de nascimento</Label>
        <Input id="data_nascimento" name="data_nascimento" type="date" required />
      </InputArea>

      <Button type="submit">{onEdit ? "Atualizar" : "Enviar"}</Button>
    </FormContainer>
  );
};

export default Form;
