DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
    PRIMARY KEY(id)
);

CREATE TABLE position (
    id INT NOT NULL AUTO_INCREMENT ,
    position_title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (dept_id), 
    REFERENCES department(dept_id),
    ON DELETE SET NULL
    
);

CREATE TABLE employee_info (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (position_id), 
    REFERENCES position(id), 
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id),
    REFERENCES employee(id) 
    ON DELETE SET NULL;
);
