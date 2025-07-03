import React, { useRef } from "react";
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
  flex: 1;
`;

function Form({ onEdit }: { onEdit?: (data: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormContainer>
      <InputArea>
        <label>Nome</label>
        <input name = "nome" />
        
      </InputArea>
    </FormContainer>
  );
}

export default Form;
