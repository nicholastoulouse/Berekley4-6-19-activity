-- make a database called animals_db with an animals table, with an animal_name column. Make a form that submits via ajax that hits a route that inserts an animal. Show all the animals on the index.html page. Make another form that submits without ajax to insert an animal.

CREATE DATABASE animals_db;

USE animals_db;

CREATE TABLE animals (
    id INT AUTO_INCREMENT, 
    animal_name VARCHAR(255),
    PRIMARY KEY(id)
);