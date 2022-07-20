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
db.connect(function(error) {
  if (error) throw error;
  console.log(`Connected to the port: ${port} `);

  //console.log(add in ascii art here if wanted)

  startMenu();
});

// user questions and prompts to start the app
const startMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "mainMenu",
        // loop: false,
        choices: [
          { name: "Add a department", value: "addDept" },
          { name: "Add a role", value: "addRole" },
          { name: "Add an employee", value: "addEmployee" },
          { name: "View Department list", value: "viewDepts" },
          { name: "View Role list", value: "viewRoles" },
          { name: "View Employee List", value: "viewEmployees" },
          { name: "Update an employee", value: "updateEmployee" },
          { name: "Delete a department", value: "deleteDept" },
          { name: "Delete a role", value: "deleteRole" },
          { name: "Delete an employee", value: "deleteEmployee" },
          { name: "Exit", value: "exit" },
        ],
      },
    ])
    .then(({ answer }) => {
        switch (answer) {
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "View Department list":
                viewDepts();
                break;
            case "View employee list":
                viewEmployees();
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
