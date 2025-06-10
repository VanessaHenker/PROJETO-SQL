const mysql = require('mysql2');

// Criar conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco'
});

// Atualizar salário
connection.query(
  'UPDATE pessoas SET salario = ? WHERE nome = ?',
  [3000, 'Maria'],
  (err, results) => {
    if (err) {
      console.error('Erro ao executar o update:', err);
    } else {
      console.log('Update realizado com sucesso:', results);
    }
    connection.end(); // Fecha a conexão
  }
);
