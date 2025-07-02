import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
/* import Form from "./components/Form"; */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

function App() {
  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
       {/*  <Form /> */}
        <ToastContainer autoClose={3000} position="bottom-left" />
      </Container>
    </>
  );
}

export default App;
