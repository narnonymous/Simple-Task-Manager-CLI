const fs = require('fs');

const TASKS_FILE = 'tasks.json';

let tasks = [];

try {
    tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
} catch (err) {
    console.log('Error loading tasks:', err.message);
}

function main() {
    console.log('Welcome to the Task Manager CLI!\n');

    displayMenu();
}

function displayMenu() {
    console.log('1. Add a new task');
    console.log('2. View all tasks');
    console.log('3. Quit');

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Please enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addTask(rl);
                break;
            case '2':
                viewTasks(rl);
                break;
            case '3':
                saveTasks();
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.\n');
                displayMenu();
        }
    });
}

function addTask(rl) {
    const readline = require('readline');
    const taskDescription = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    taskDescription.question('Enter task description: ', (description) => {
        const task = {
            description: description,
            completed: false
        };

        tasks.push(task);
        console.log('Task added successfully!\n');
        taskDescription.close();
        displayMenu();
    });
}

function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.\n');
        displayMenu();
        return;
    }

    console.log('Tasks:\n');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} (${task.completed ? 'Complete' : 'Incomplete'})`);
    });
    console.log('');
    displayMenu();
}

function saveTasks() {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

main();
