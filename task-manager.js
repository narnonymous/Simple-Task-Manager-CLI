const readlineSync = require('readline-sync');
const fs = require('fs');

const TASKS_FILE = 'tasks.json';

// Load tasks from file or initialize empty array
let tasks = [];
try {
    tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
} catch (err) {
    console.log('Error loading tasks:', err.message);
}

// Main function to start the task manager
function main() {
    console.log('Welcome to the Task Manager CLI!\n');

    while (true) {
        console.log('1. Add a new task');
        console.log('2. View all tasks');
        console.log('3. Quit');

        const choice = readlineSync.question('Please enter your choice: ');

        switch (choice) {
            case '1':
                addTask();
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                saveTasks();
                console.log('Goodbye!');
                return;
            default:
                console.log('Invalid choice. Please try again.\n');
        }
    }
}

// Function to add a new task
function addTask() {
    const description = readlineSync.question('Enter task description: ');

    const task = {
        description: description,
        completed: false
    };

    tasks.push(task);
    console.log('Task added successfully!\n');
}

// Function to view all tasks
function viewTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.\n');
        return;
    }

    console.log('Tasks:\n');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} (${task.completed ? 'Complete' : 'Incomplete'})`);
    });
    console.log('');
}

// Function to save tasks to file
function saveTasks() {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Start the task manager
main();
