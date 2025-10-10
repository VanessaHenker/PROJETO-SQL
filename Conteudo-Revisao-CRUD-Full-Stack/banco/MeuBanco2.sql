-- Active: 1754954648150@@127.0.0.1@3306@meubanco2

USE MeuBanco2;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT DEFAULT '',
  preco DECIMAL(10,2) DEFAULT 0.00,
  quantidade_estoque INT DEFAULT 0,
  data_cadastro DATE DEFAULT (CURRENT_DATE),
  imagem_url VARCHAR(255) DEFAULT NULL
);
