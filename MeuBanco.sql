-- Active: 1749081423881@@localhost@3306@mysql

SELECT pessoas.nome, enderecos.*
FROM pessoas
JOIN enderecos on pessoas.id = enderecos.pessoasID