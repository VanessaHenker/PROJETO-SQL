import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Estilos
const Table = styled.table`
  width: 100%;
  background-color: #fff;
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

  ${(props) =>
    props.onlyweb &&
    css`
      @media (max-width: 500px) {
        display: none;
      }
    `}
`;

export const Td = styled.td`
  padding: 10px;
  text-align: start;

  ${(props) =>
    props.onlyweb &&
    css`
      @media (max-width: 500px) {
        display: none;
      }
    `}
`;

function Grid() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dados")
      .then((res) => setDados(res.data))
      .catch(() => toast.error("Erro ao carregar dados!"));
  }, []);

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
      <tbody>
        {dados.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.nome}</Td>
            <Td>{item.email}</Td>
            <Td onlyweb>
              <FaEdit style={{ marginRight: "10px", cursor: "pointer" }} />
              <FaTrash style={{ color: "red", cursor: "pointer" }} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Grid;
