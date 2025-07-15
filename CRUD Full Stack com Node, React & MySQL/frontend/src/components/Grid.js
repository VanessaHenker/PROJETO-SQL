import React from 'react';
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify"; // Corrigido: estava "toastity"


const Table = styled.table`
  width: 100%;
  background-color: #fff; /* corrigido: 'backgroud-color' e uso de '=' */
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-word;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: 1px inset #ccc;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyweb && "display: none;"}
  }
`;

function Grid() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyweb>Ações</Th>
        </Tr>
      </Thead>
    </Table>
  );
}

export default Grid;
