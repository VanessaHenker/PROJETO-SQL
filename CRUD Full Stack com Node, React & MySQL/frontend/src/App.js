import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import GlobalStyle from "./styles/global";
import Form from "./components/Form";
import Grid from "./components/Grid";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #333;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message || "Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form getUsers={getUsers} onEdit={onEdit} setOnEdit={setOnEdit} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>

      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
