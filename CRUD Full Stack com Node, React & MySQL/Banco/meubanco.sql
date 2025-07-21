-- Active: 1753139647849@@localhost@3306@mysql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nascimento DATE,
    email VARCHAR(100) NOT NULL,
    fone BOOLEAN DEFAULT FALSE
);
