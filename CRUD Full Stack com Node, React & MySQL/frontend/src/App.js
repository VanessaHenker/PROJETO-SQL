import GlobalStyle from "./styles/global";
import { ToastContainer, POSITION } from "react-toastify"; // ✅ Corrigido aqui
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";

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
  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form />
      </Container>

      <ToastContainer autoClose={3000} position={POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
