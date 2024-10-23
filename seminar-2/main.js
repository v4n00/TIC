import { displayTasks } from './tasksManagement.js';
import { checkAuthentication, getTasks, loginUser, logout, registerUser } from './userManagement.js';

console.log("I'm in");

const tasks = await getTasks();

function printTasks(tasks) {
	tasks.forEach((element) => {
		console.log(`Responsible: ${element.responsible}
Description: ${element.description}
------------------------`);
	});
}

const URL = 'http://localhost:3000';
const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const addForm = document.getElementById('addtask');
const editForm = document.getElementById('edittask');
const logoutButton = document.getElementById('logout');
const container = document.getElementById('task-container');

if (checkAuthentication()) {
	// User is authenticated
	displayTasks(tasks);
	// Hide the login and registration forms
	registerForm.style.display = 'none';
	loginForm.style.display = 'none';
	logoutButton.style.display = 'block';
} else {
	// User is not authenticated
	// Ensure the forms are visible
	registerForm.style.display = 'block';
	loginForm.style.display = 'block';
	logoutButton.style.display = 'none';
}

addForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const task = {};

	task.id = document.getElementById('task-id').value.trim();
	task.responsible = document.getElementById('task-responsible').value.trim();
	task.description = document.getElementById('task-description').value.trim();
	task.status = document.getElementById('task-status').value.trim();

	let taskToAdd = await fetch(`${URL}/add-task`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(task),
	});

	tasks.push(await taskToAdd.json());

	displayTasks(tasks);
});

editForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const task = {};

	task.id = document.getElementById('edit-task-id').value.trim();
	task.responsible = document.getElementById('edit-task-responsible').value.trim();
	task.description = document.getElementById('edit-task-description').value.trim();
	task.status = document.getElementById('edit-task-status').value.trim();
	console.log(JSON.stringify(task));

	await fetch(`${URL}/edit-task`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(task),
	});

	console.log('hello');
	let newTasks = await getTasks();
	displayTasks(newTasks);
});

registerForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const user = {};
	user.name = document.getElementById('register-name').value.trim();
	user.email = document.getElementById('register-email').value.trim();
	user.password = document.getElementById('register-password').value.trim();

	registerUser(user);
});

// Handle login form submission
loginForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const email = document.getElementById('login-email').value.trim();
	const password = document.getElementById('login-password').value.trim();

	const isAuthenticated = loginUser(email, password);

	if (isAuthenticated) {
		alert('Login successful!');
		displayTasks(tasks);
		logoutButton.style.display = 'block';
		registerForm.style.display = 'none';
		loginForm.style.display = 'none';
	} else {
		alert('Invalid email or password.');
		loginForm.reset();
	}
});

logoutButton.addEventListener('click', () => {
	logout();
	registerForm.style.display = 'block';
	loginForm.style.display = 'block';
	container.style.display = 'none';
	logoutButton.style.display = 'none';
});
