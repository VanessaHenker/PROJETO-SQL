-- Active: 1754954648150@@127.0.0.1@3306@meubanco2

CREATE TABLE produtos (
  produto_id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  quantidade_estoque INT DEFAULT 0,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
