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
            inquirer.prompt({name: 'name', message: 'What is the name of the department you want to add?', type: 'input'})
            .then((departmentAnswers) => {
                console.log(`Added ${departmentAnswers.name} to the departments table!`);
            })
            break;
        }
        case 'Add a role': {
            inquirer.prompt([{
                name: 'name', message: 'What is the name of the role you want to add?', type: 'input'
            },
            {
                name: 'salary', message: (answers) => `What is the salary for the ${answers.name} role?`, type: 'number'
            },
            {
                name: 'department', message: (answers) => `Which department would you like the ${answers.name} role added to?`, type: 'input'
            }])
            .then((roleAnswers) => {
                console.log(`Added ${roleAnswers.name} to the roles table!`);
            }) 
            break;
        }
        case 'Add an employee': {
            inquirer.prompt([{
                name: 'firstName', message: 'What is the employees first name?', type: 'input'
            },
            {
                name: 'lastName', message: 'What is the employees last name?', type: 'input'
            },
            {
                name: 'role', message: 'What is the employees role?', type: 'input'
            },
            {
                name: 'manager', message: 'Who is the employees manager?', type: 'input'
            }])
            .then((employeeAnswers) => {
                console.log(`Added ${employeeAnswers.name} to the roles table!`);
            }) 
            break;
        }
        case 'Update an employee role': {
            break;
        }
    }
})