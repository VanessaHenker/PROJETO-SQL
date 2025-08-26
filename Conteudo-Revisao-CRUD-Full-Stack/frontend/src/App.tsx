import styles from "./app.module.css";
import Form from "./components/Form";

const App = () => {
  return (
    <div className={styles.App}>
      <h1>Cadastro de Produtos</h1>
      <div>
        <Form />
    
      </div>
    </div>
  );
};

export default App;
