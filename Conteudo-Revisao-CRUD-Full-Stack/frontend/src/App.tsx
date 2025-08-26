import styles from "./app.module.css";
import Form from "./components/Form";
import Grid from "./components/Grid";

const App = () => {
  return (
    <div className={styles.App}>
      <h1>Cadastro de Produtos</h1>
      <div>
        <Form />
        <Grid produtos={[]} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default App;
