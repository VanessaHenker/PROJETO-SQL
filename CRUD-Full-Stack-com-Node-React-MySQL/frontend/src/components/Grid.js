import styled from "styled-components";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  word-break: break-word;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: start;
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este usuário?")) return;

    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar usuário.");
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Fone</Th>
          <Th>Data de Nascimento</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item) => (
          <Tr key={item.id}>
            <Td>{item.nome}</Td>
            <Td>{item.email}</Td>
            <Td>{item.fone}</Td>
            <Td>
              {item.dataNascimento
                ? new Date(item.dataNascimento).toLocaleDateString("pt-BR")
                : "Data inválida"}
            </Td>
            <Td>
              <FaEdit
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleEdit(item)}
                title="Editar usuário"
              />
              <FaTrash
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDelete(item.id)}
                title="Deletar usuário"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
