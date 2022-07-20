
const logo = require('asciiart-logo');
const db = require("./db");
const { showMainPrompt } = require('./routes');


//connect the database to the inquirer questions
db.connect(function (error) {
    if (error)
        throw error;
        //console.log(add in ascii art here if wanted)
    showMainPrompt();
    
});