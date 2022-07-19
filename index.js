const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo')

const db = mysql.createConnection({
    host: 'localhost',
    database: 'employee_db',
    user: "root",
    password: ""
})

const viewDepts = () => {
    db.query("SELECT * FROM departments", (err, result) => {
        if (err) {
            console.error(err);
        }
        console.log(result);
    });
    console.log("now viewing departments");
};

const viewRoles = () => {
    console.log("now viewing roles");
}
const addDepts = () => {
    console.log("now adding departments");
}

const addRoles = () => {
    console.log("now adding roles");
}

const addEmployee = () => {
    console.log("now adding employees");
} 

const updateEmployee = () => {
    console.log("now updating employees");
}


const quit = () => {
    // not sure if this is correct
    console.log("You are logging out of the employee management system");
    process.exit();
};

const choiceMap = {
    // viewDepts: viewDepts key:value equal for each, shorter syntax looks like
    viewDepts,
    viewRoles,
    addDepts,
    addRoles,
    addEmployee,
    updateEmployee,
    quit,
}
//This will allow the user to select a function and then it calls the main prompt again 
const handleChoice = (choice) => {
    choiceMap[choice]()
    if(choice !== "quit") {
        mainPrompt();
    }
}

const mainPrompt =  async () => {
    const result = await inquirer.prompt([
    {
        message: 'What would you like to do?',
        type: "list",
        name: "userChoice",
        choices: [
            {
                name: "View all departments",
                value: "viewDepts",
            },
            {
                name: "View all roles",
                value: "viewRoles",
            },
            {
                name: "Add a dept",
                value: "addDepts",
            },
            {
                name: "Add a role",
                value: "addRoles",
            },
            {
                name: "Add an employee",
                value: "addEmployee",
            },
            {
                name: "Update employee role",
                value: "updateEmployee",
            },
            {
                name: "Quit",
                value: "quit",
            },
        ],

    },
]);
    console.log({result});
    //allows for the mainPrompt function to be called again 
    handleChoice(result.userChoice);
};

//creates a logo in the terminal
console.log(logo({ name: "Employee Database"}).render());
mainPrompt();