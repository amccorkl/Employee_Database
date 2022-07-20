INSERT INTO department(name)
    VALUES 
        ("Finance"),
        ("Engineering"),
        ("Sales"),
        ("HR"),
        ("Legal");

INSERT INTO roles(title, salary, department_id)
    VALUES 
        ("Manager", 230000, 1),
        ("Admin Assistant", 65000, 1),
        ("Lead Engineer", 130000, 2),
        ("Software Engineer", 90000, 2),
        ("Marketing Director", 85000, 3),
        ("Sales Representative", 65000, 3),
        ("Accountant", 120000, 4),
        ("Legal Team Lead", 160000, 5),
        ("Legal", 120000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES 

        ("Mike", "Chan", 1, NULL),
        ("Ashley", "Rodriguez", 2, 1),

        ("Kevin", "Tupik", 3, 2);
        -- ("Kumal", "Singh", 4, 3),

        -- ("James", "Cavenaugh", 5, 1),

        -- ("Malia", "Brown", 6, NULL),
        
        -- ("Sarah", "Lourd", 7, NULL),
        -- ("Tom", "Allen", 4, 1);