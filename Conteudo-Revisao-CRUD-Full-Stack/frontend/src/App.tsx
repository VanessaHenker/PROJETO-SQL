import "./app.module.css";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="App">
      <h1>Cadastro de Produtos</h1>
      <div className="card">
        <Form />
      </div>
    </div>
  );
};

export default App;
