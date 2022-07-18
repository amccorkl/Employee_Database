INSERT INTO department(dept_name)
VALUES 
    ("Finance"),
    ("Engineering"),
    ("Sales"),
    ("HR")
    ("Legal");

INSERT INTO position(position_id, position_title, salary)
VALUES 
    ("1, HR, 130000"),
    ("2, Engineering, 130000"),
    ("3, Sales, 80000"),
    ("4, Finance, 120000"),
    ("5, Legal, 180000");

INSERT INTO employee_info(first_name, last_name, position_id, position_title, manager_id)
VALUES 
-- not sure about the manager id versus a name?? 4th value
    ("Mike, Chan, Salesperson, 3, Kumal Singh"),
    ("Ashley, Rodriguez, Lead Engineer, 2, null"),
    ("Kevin, Tupik, Software Engineer, 2, Ashley Rodriguez"),
    ("Kumal,  Singh, Account Manager, 1, null"),
    ("Malia, Brown, Accountant, 4, Kumal Singh"),
    ("Sarah, Lourd, Legal Team Lead, 5, null"),
    ("Tom, Allen, Lawyer, 5, Sarah Lourd");