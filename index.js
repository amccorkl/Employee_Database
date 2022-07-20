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
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
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

const viewDepts = () => {
    db.query('SELECT name FROM department ORDER BY id', (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      console.log("Departments:\n");
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
              }
              console.log(`Added department:\n ${result.newDept}`);
              startMenu();

            }
        )
    });
}


startMenu();