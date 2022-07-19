const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    database: '',
})

const viewDepts = () => {
    db.query("SELECT * FROM department", (err, result) => {
        
    })
    console.log("now viewing departments");
}

const viewRoles = () => {
    console.log("now viewing roles");
}

const quit = () => {
    // not sure if this is correct
    console.log("delete the employee");
    process.exit();
}

const choiceMap = {
    // viewDepts: viewDepts shorter syntax is
    viewDepts,
    viewRoles,
    quit,
}

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
                name: "View all depts",
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
                name: "Quit",
                value: "quit",
            }
        ]

    }
])
    console.log({result});
    // is this function call correct here?
    handleChoice(result.userChoice);
}


mainPrompt();