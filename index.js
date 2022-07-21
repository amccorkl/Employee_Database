const logo = require("asciiart-logo");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db"
});

//connect the database to the inquirer questions
// db.connect(function(error) {
//   if (error) throw error;
//   console.log("Connected to the database");

//   //console.log(add in ascii art here if wanted)

//   startMenu();
// });

// user questions and prompts to start the app
const startMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "mainMenu",
        choices: [
          "View Department list",
          "Add a department", 
          "Add a role", 
          "Add an employee", 
          "View Role list", 
          "View Employee List", 
          "Delete a department", 
          "Delete a role", 
          "Delete an employee", 
          "Exit", 
        ],
      },
    ])
    .then(({ mainMenu }) => {
        switch (mainMenu) {
            case "View Department list":
                viewDepts();
                break;
            case "View employee list":
                viewEmployees();
                break;
            case "View roles list":
                viewRoles();
                break
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee":
                updateEmployee();
                break;
            case "Delete a department":
                deleteDept();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Exit Program":
                db.end();
                break;
        }
    });
};

// working
const viewDepts = () => {
    db.query('SELECT name FROM department ORDER BY id', (err, res) => {
      if (err) {
        return "Departments can't be retrieved";
      } else {
        console.table(res);
      }
      startMenu();
    });
}

// won't show yet
const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
      }
      startMenu();
    });
}

const viewRoles = () => {
    db.query('SELECT * FROM roles', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
      }
      startMenu();
    });
}

const addDept = () => {
    inquirer.prompt(
        {
           type: "input",
           message: "What deparment name would you like to add?",
           name: "newDept"
        }
    ).then((result) => {
        db.query("INSERT INTO department(name) VALUES (?)", result.newDept, (err, res) => {
            if (err) {
                console.log(err);
              } else console.table(`Added department:\n ${result.newDept}`);
              startMenu();

            }
        )
    });
}

const addRole = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log(err);
          }
        inquirer.prompt([
            {
                type: "input",
                message: "What role would you like to add?",
                name: "newRole"
            },
            {
                type: "input",
                message: "what salary would you like to assign this role",
                name: "roleSalary",
            },
            {
                type: "list",
                message: "In which department does the role belong?",
                name: "roleDept",
                choices: [
                    {name: "HR", value: "1"},
                    {name: "Engineering", value: "2"},
                    {name: "Sales", value: "3"},
                    {name: "Finance", value: "4"},
                    {name: "Legal", value: "5"}
                    
                ]
            },
        ])
        .then((result) => {
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
                [
                    result.newRole,
                    result.roleSalary,
                    result.roleDept
                ], 
                (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(`Added a new role:\n ${res.newRole}`);
                    startMenu();
                }
            )

        })
    });
}

const addEmployee = () => {
    inquirer.prompt(
        {
           type: "input",
           message: "What employee would you like to add?",
           name: "newEmployee"
        }
    ).then((result) => {
        db.query("INSERT INTO employee({first_name, last_name, role_id, manager_id}) VALUES (?)", result.newEmployee, (err, res) => {
            if (err) {
                console.log(err);
              }
              console.table(`Added new employee:\n ${result.newEmployee}`);
              startMenu();

            }
        )
    });
}


startMenu();