DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE position (
    id INT NOT NULL  AUTO_INCREMENT,
    position_id INT,
    position_title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (position_id)
);

CREATE TABLE employee_info (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INT,
    manager_id INT,
    FOREIGN KEY (employee_id), 
    REFERENCES position(id),
    ON DELETE SET NULL;
);
