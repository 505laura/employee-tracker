//@ts-check
const inquirer = require('inquirer');

console.log('Welcome to the Employee Tracker!');

const options = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];

inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: options
}]).then((answers) => {

console.log(answers);

switch (answers.action) {
    case 'View all departments': {
        console.table([
            {name: 'Maths', id: 1},
            {name: 'Computer Science', id: 2}
        ]);
        break;
    }
    case 'View all roles': {
        console.table([
            {name: 'Teacher', id: 1},
            {name: 'Student', id: 2}
        ]);
        break;
    }
    case 'View all employees': {
        console.table([
            {name: 'Jasmine', id: 1},
            {name: 'Peter', id: 2}
        ]);
        break;
    }
    case 'Add a department': {
        break;
    }
    case 'Add a role': {
        break;
    }
    case 'Add an employee': {
        break;
    }
    case 'Update an employee role': {
        break;
    }
}
})