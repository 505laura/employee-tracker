//@ts-check
const inquirer = require('inquirer');

console.log('Welcome to the Employee Tracker!');

const options = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];

inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: options
}])
    .then((answers)=> console.log(answers));


