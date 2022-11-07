//@ts-check
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

async function main() {
    // create the connection to database
    const connection = await mysql.createConnection({
        user: 'root',
        database: 'company_db'
    });
    
    const getAllDepartments = async() => {
        const [res] = await connection.query('SELECT * from departments')
        return res;
    };
    
    const getAllRoles = async() => {
        const [res] = await connection.query('SELECT * from roles');
        return res;
    };

    const getAllRolesFull = async() => {
        const [res] = await connection.query('SELECT roles.*, departments.name as department_name from roles JOIN departments ON departments.id = roles.department_id');
        return res;
    }
    
    const getAllEmployees = async() => {
        const [res] = await connection.query('SELECT * from employees');
        return res;
    };

    const getAllEmployeesFull = async() => {
        const [res] = await connection.query('SELECT employees.*, roles.title as role, roles.salary, departments.name as department_name from employees JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id');
        res.forEach((employee) => {
            const manager = employee.manager_id === null ? {first_name: '', last_name: ''} : res.filter((emp) => emp.id === employee.manager_id).slice(-1)[0];
            employee.manager = `${manager.first_name} ${manager.last_name}`;
            delete employee.manager_id;
        })
        return res;
    };
    
    console.log('Welcome to the Employee Tracker!');
    const options = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];
    
    const viewDepartments = async() => {
        const departments = await getAllDepartments();
        console.table(departments);
    };
    
    const viewRoles = async() => {
        const roleData = await getAllRolesFull();
        console.table(roleData);
    };
    
    const viewEmployees = async() => {
        const employees = await getAllEmployeesFull();
        console.table(employees);
    };
    
    const addDepartment = async() => {
        const departmentAnswers = await inquirer.prompt({name: 'name', message: 'What is the name of the department you want to add?', type: 'input'});
        const [res] = await connection.query('SELECT COUNT(id) as count from departments;');
       await connection.query('INSERT INTO departments VALUES(?, ?)', [res[0].count, departmentAnswers.name]);
        console.log(`Added ${departmentAnswers.name} to the departments table!`);
    };
        
        const addRole = async() => {
            const roleAnswers = await inquirer.prompt([
                {name: 'name',       message: 'What is the name of the role you want to add?',                                   type: 'input'},
                {name: 'salary',     message: (answers) => `What is the salary for the ${answers.name} role?`,                   type: 'number'},
                {name: 'department', message: (answers) => `Which department would you like the ${answers.name} role added to?`, type: 'input'}
            ])
            const [res] = await connection.query('SELECT COUNT(id) as count from roles;');
            const [dep] = await connection.query
            await connection.query('INSERT INTO roles VALUES(?, ?, ?, ?)', [res[0].count, roleAnswers.name, roleAnswers.salary, roleAnswers.department]);
            console.log(`Added ${roleAnswers.name} to the roles table!`);
        };
        
        const addEmployee = async() => {
            const employeeAnswers = await inquirer.prompt([
                {name: 'firstName', message: 'What is the employees first name?', type: 'input'},
                {name: 'lastName',  message: 'What is the employees last name?',  type: 'input'},
                {name: 'role',      message: 'What is the employees role?',       type: 'input'},
                {name: 'manager',   message: 'Who is the employees manager?',     type: 'input'}
            ])
            console.log(`Added ${employeeAnswers.name} to the roles table!`);
            
        };
        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: options
        }]).then(async(answers) => {
            
            switch (answers.action) {
                case 'View all departments': {
                    await viewDepartments();    
                    break;
                }
                case 'View all roles': {
                    await viewRoles();
                    break;
                }
                case 'View all employees': {
                    await viewEmployees();
                    break;
                }
                case 'Add a department': {
                    await addDepartment()
                    break;
                }
                case 'Add a role': {
                    await addRole()
                    break;
                }
                case 'Add an employee': {
                    await addEmployee()
                    break;
                }
                case 'Update an employee role': {
                    break;
                }
            }
            
            connection.end();
        })
    }
    
    
    main();