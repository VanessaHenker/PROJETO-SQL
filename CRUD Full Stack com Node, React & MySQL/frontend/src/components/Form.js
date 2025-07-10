import React, { useRef } from 'react';
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = ({ onEdit }) => {
  const ref = useRef();

  return (
    <FormContainer ref={ref}>
      <InputArea>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" />
      </InputArea>

      <InputArea>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" />
      </InputArea>

      <InputArea>
        <label htmlFor="fone">Telefone</label>
        <input id="fone" name="fone" type="tel" />
      </InputArea>

      <InputArea>
        <label htmlFor="dataNascimento">Data de nascimento</label>
        <input id="dataNascimento" name="dataNascimento" type="date" />
      </InputArea>
    </FormContainer>
  );
};

export default Form;
