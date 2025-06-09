-- Active: 1749081423881@@localhost@3306@mysql

CREATE TABLE enderecos (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  rua VARCHAR (255),
  numero VARCHAR(10),
  pessoasID INT NOT NULL,
  FOREIGN KEY (pessoasID) REFERENCES pessoas(id)
)