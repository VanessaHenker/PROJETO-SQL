-- Active: 1754954648150@@127.0.0.1@3306@mysql
/* CREATE TABLE produtos (
  produto_id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT DEFAULT '',
  preco DECIMAL(10,2) DEFAULT 0,
  quantidade_estoque INT DEFAULT 0,
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  imagem_url VARCHAR(255) DEFAULT NULL
);
 */

 SELECT * FROM produtos ORDER BY produto_id DESC;

CREATE DATABASE meubanco2;

USE meubanco2;

CREATE TABLE produtos (
  produto_id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT DEFAULT '',
  preco DECIMAL(10,2) DEFAULT 0,
  quantidade_estoque INT DEFAULT 0,
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  imagem_url VARCHAR(255) DEFAULT NULL
);


