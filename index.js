//connect to the .env folder
require("dotenv").config()

const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_db"
});


// user questions and prompts to start the app
const startMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "mainMenu",
        choices: [
          "View department list",
          "Add a department", 
          "Add a role", 
          "Add an employee", 
          "View role list", 
          "View employee list", 
          "Update employee role",
          "View all the company stats",
          "exit", 
        ],
      },
    ])
    .then(({ mainMenu }) => {
        switch (mainMenu) {
            case "View department list":
                viewDepts();
                break;
            case "View employee list":
                viewEmployees();
                break;
            case "View role list":
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
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "View all the company stats":
                viewCompany();
                break;
            case "exit":
                process.exit();
                break;
        }
    });
};

// Departments show up by id number
const viewDepts = () => {
    const query = 'SELECT name FROM department ORDER BY id';
    db.query(query, (err, res) => {
      if (err) {
        return "Departments can't be retrieved";
      } 
        console.table(res);
        startMenu();
    });
}

// created using the promise language and destructured response, view Company shows up with all the details next
const viewEmployees =  () => {
    const query = 'SELECT * FROM employee'
    db.promise().query(query).then(([res]) => {
        console.table(res);
        viewCompany();
    });
    
    
};

//  after viewing the roles, the entire company's information db shows up
const viewRoles = () => {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } 
      console.table(res);
      viewCompany();
    });
};

// after adding a department, all the departments show in the view
const addDept = () => {
    inquirer.prompt([
        {
           type: "input",
           message: "What deparment name would you like to add?",
           name: "newDept"
        }
     ]).then((result) => {
        db.query("INSERT INTO department(name) VALUES (?)", result.newDept, (err, result) => {
            if (err) {
                console.log(err);
              } else console.table(`Added department:\n ${result.newDept}`);
              viewDepts();
            }
        )
    });
}

// trying the newly learned async function, may over the departments already there to help connect the user's responses
const addRole = async () => {
    const [departments] = await db.promise().query("SELECT * FROM department")
    const departmentsArr = departments.map(department => ({
        name: department.name, 
        value: department.id

    }))
    console.log(departmentsArr);

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
            choices: departmentsArr
        },
    ])
    .then((result) => {
        const newRole = {title: result.newRole, salary:result.roleSalary, department_id: result.roleDept}
        let query = "INSERT INTO roles SET ?" 
        
        db.query(query, newRole, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.table(`Added a new role:\n ${res.newRole}`);
            viewRoles();
        });
    }); 
};


// Employees added into hard coded roles
const addEmployee = () => {
    inquirer.prompt([
        {
           type: "input",
           message: "What is the new employee's first name?",
           name: "first_name"
        },
        {
            type: "input",
            message: "What is the new employee's last name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "What role will they have?",
            name: "role_id",
            choices: [
                {name: "Software Engineer", value: "2"},
                {name: "Sales Representative", value: "3"},
                {name: "Acountant", value: "4"},
                {name: "Legal", value: "5"}
            ]
        },
        {
            type: "input",
            message: "Who is their manager?",
            name: "manager_id",
        },
    ])
    .then((result) => {
        let query = (`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${result.first_name}', '${result.last_name}', '${result.role_id}', '${result.manager_id}')`); 

        db.query(query, (err, res)=>  {
            if (err) {
                console.log(err);
              }
              console.table(`Added new employee:\n ${res.newEmployee}`);
              viewEmployees();
        })
    });
};

//employee list generated for user to choose from to update the employee
const updateEmployeeRole = () => {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log(err);
        }

    let employeeChoices = res.map(employee => {
        return {
            name: employee.first_name,
            value: employee.id
        }
    })
        inquirer.prompt([
            {
                type: "list",
                message: "What employee do you want to update?",
                name: "updateEmployee",
                choices: employeeChoices
            },
            {
                type: "list",
                message: "What new role do you want them to have?",
                name: "newRole",
                choices: [
                    {name: "Software Engineer", value: "2"},
                    {name: "Sales Representative", value: "3"},
                    {name: "Acountant", value: "4"},
                    {name: "Legal", value: "5"}
                ] 
            },
        ])
        .then((result) => {
            let updateEmployee = result.updateEmployee;
            let newRole = result.newRole;
            let query = `UPDATE employee SET role_id = '${newRole}' WHERE id = '${updateEmployee}'`;
            db.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                viewEmployees();
            })
        })  
    }) 
};

//all the company details in one table
const viewCompany = () => {
    const query = "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id"
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        startMenu();
    })
}

startMenu();