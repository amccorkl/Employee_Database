DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE position (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position_title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES (department_id)
    ON DELETE CASCADE
    
);

CREATE TABLE employee_info (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (position_id), 
    REFERENCES position(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id) ON DELETE SET NULL;
);
