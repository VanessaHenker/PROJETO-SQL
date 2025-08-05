import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./components/Grid";
import Form from "./components/Form";

const App = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/usuarios");
      setUsers(res.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  return (
    <div className="container">
      <h1>USUÁRIOS</h1>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
    </div>
  );
};

export default App;
