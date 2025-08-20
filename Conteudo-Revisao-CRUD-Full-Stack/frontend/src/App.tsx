import React from "react";
import Form from "./components/Form"; // caminho correto
import "./styles/form.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cadastro de Produtos</h1>
      <Form />
    </div>
  );
};

export default App;
