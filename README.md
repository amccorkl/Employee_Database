# Employee Database
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Using Node.js, Inquirer, and MySQL2 as the database, this content management system runs from the command-line and allows the user to view and update employees as well as their roles. The app functions through Node.js.

<details>
<summary><strong>Table of Contents</strong></summary>

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Languages, Skills, Credits](#languages-skills-credits)
- [Screenshots and Video Walkthrough](#screenshots-and-video-walkthrough)
- [Details and Learning](#details-and-learning)
- [Questions and Links](#questions-and-links)
</details>



## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Installation
- Clone the repository
- Run npm init, then npm install dotenv mysql2
- Source the schema and seeds to populate the database and tables from the /db folder

## Usage
The application should be run using the following command: node index.js.

## License
Distributed under the **MIT** license.

## Tests
There are currently no tests written for this application.

## Screenshots and Video Walkthrough

- The database schema was designed as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

- The following video shows an example of the application being used from the command line: 
[A 2 min video](https://drive.google.com/file/d/1JroHqBxLlLBPcV9iRYOveppoJ2r5au77/view?usp=sharing)



## Languages, Skills, Credits

- The app uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries.

- The [Inquirer package](https://www.npmjs.com/package/inquirer) interact with the user via the command line. 

- The [console.table package](https://www.npmjs.com/package/console.table) prints MySQL rows to the console.

- The [dotenv](https://www.npmjs.com/package/dotenv) file is used to host sensitive credentials in an environment file and connected to  .gitignore.  


## Details and Learning

Creating JOIN statements took some effort in addition to continually making the app dynamic for when a user creates or updates information.


## Questions and Links
The repository for this application is [Github](https://github.com/amccorkl/employee_database)

Feel free to reach out with any questions about the application.
