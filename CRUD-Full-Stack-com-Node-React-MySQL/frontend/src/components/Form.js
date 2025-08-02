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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const form = ref.current;
      form.nome.value = onEdit.nome || "";
      form.email.value = onEdit.email || "";
      form.fone.value = onEdit.fone || "";
      // Ajuste para nome do campo que vem do backend
      form.dataNascimento.value = onEdit.data_nascimento
        ? onEdit.data_nascimento.split("T")[0] // Formata ISO date para yyyy-mm-dd
        : "";
    } else {
      ref.current.reset();
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData);

    try {
      if (onEdit) {
        // PUT para editar usuário
        await fetch(`http://localhost:8800/usuarios/${onEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        // POST para criar novo usuário
        await fetch("http://localhost:8800/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        toast.success("Usuário criado com sucesso!");
      }
      ref.current.reset();
      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error("Erro ao salvar usuário.");
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
        <Input id="dataNascimento" name="data_nascimento" type="date" required />
      </InputArea>

      <Button type="submit">{onEdit ? "Atualizar" : "Enviar"}</Button>
    </FormContainer>
  );
};

export default Form;
