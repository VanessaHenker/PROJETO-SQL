import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', password);
    axios.post('http://localhost:3000/login', {email, password})
    .then (res => console.log(res))
    .catch (err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuário</label>
          <input 
            type="text" 
            className="form-control" 
            id="usuario" 
            placeholder="Digite seu usuário"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input 
            type="password" 
            className="form-control" 
            id="senha" 
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
