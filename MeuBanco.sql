-- Active: 1748905997432@@localhost@3306@mysql

-- Criar um banco
--CREATE DATABASE banco;

-- Remover um banco
--DROP DATABASE banco;

--USE banco;

-- criar = create
-- deletar = drop

/* CREATE TABLE minhaTabela (
  nome VARCHAR (100)
); */ 

-- Remover
--DROP TABLE minhaTabela;

-- Tipos de dados:
-- texto = VARCHAR (100)
-- numero = INT(x)
-- datas = DATE

/* CREATE TABLE pessoas (
  nome VARCHAR (100),
  salario int,
  dataNascimento DATe 
) */

-- Alterar uma tabela

--ALTER TABLE pessoas ADD COLUMN profissao VARCHAR (255);

--SELECT * FROM pessoas; 

INSERT INTO pessoas (nome, salario, dataNascimento, profissao)
VALUES ("Vanessa", "3000", "25-03-2004", "Programadora")