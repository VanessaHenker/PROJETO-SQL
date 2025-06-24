-- Active: 1750723684436@@localhost@3306@meubanco
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  fone VARCHAR(45) NOT NULL,
  data_nascimento DATE
);
