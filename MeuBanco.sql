-- Active: 1749081423881@@localhost@3306@mysql

CREATE Table pessoas (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(100),
  salario INT,
  dataNascimento DATE
)