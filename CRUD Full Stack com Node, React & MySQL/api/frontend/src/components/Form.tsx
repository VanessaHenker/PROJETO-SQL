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

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border-radius: 1px solid #bbb;
  height: 40px;
`

function Form({ onEdit }: { onEdit?: (data: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormContainer>
      <InputArea>
        <label>Nome</label>
        <input name = "nome" />
      </InputArea>


      <InputArea>
        <label>E-mail</label>
        <input name = "fone" type="email"/>
      </InputArea>

      <InputArea>
        <label>Telefone</label>
        <input name = "fone" />
      </InputArea>

      <InputArea>
        <label>Data de nascimento</label>
        <input name = "dataNascimento" type="date" />
      </InputArea>
      

{/*       <Button type = "submit"> SALVAR </Button> */}

    </FormContainer>
  );


  
}

export default Form;
