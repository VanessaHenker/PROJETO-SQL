import React from 'react';

function Login() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuário</label>
          <input type="text" className="form-control" id="usuario" placeholder="Digite seu usuário" />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input type="password" className="form-control" id="senha" placeholder="Digite sua senha" />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
