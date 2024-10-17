import { registerUser } from './userManagement.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [
	{
		id: 1,
		responsible: 'Tudor',
		description: 'do the dishes',
		status: 'pending',
	},
	{
		id: 2,
		responsible: 'Gerbil',
		description: 'clean the room',
		status: 'done',
	},
	{
		id: 3,
		responsible: 'Vasi',
		description: 'buy groceries',
		status: 'in progress',
	},
];

let printTasks = (tasks) => {
	tasks.forEach((task) => {
		console.log(`Responsible: ${task.responsible}\nDescription: ${task.description}\n-------------------------------`);
	});
};

let displayTasks = (tasks) => {
	const container = document.getElementById('task-container');

	container.innerHTML = '';

	if (tasks.length === 0) {
		let warning = document.createElement('p');
		warning.innerText = 'No tasks available';
		container.appendChild(warning);
	} else {
		const taskList = document.createElement('ul');

		const authenticated = localStorage.getItem('authenticated');
		const loggedInUser = localStorage.getItem('loggedInUser');

		tasks.forEach((task) => {
			const taskItem = document.createElement('li');

			const taskId = document.createElement('div');
			taskId.innerText = task.id;
			taskItem.appendChild(taskId);

			const taskDescription = document.createElement('div');
			taskDescription.innerText = task.description;
			taskItem.appendChild(taskDescription);

			const taskResponsible = document.createElement('div');
			taskResponsible.innerText = task.responsible;
			taskItem.appendChild(taskResponsible);

			const taskStatus = document.createElement('div');
			taskStatus.innerText = task.status;
			taskItem.appendChild(taskStatus);

			console.log(loggedInUser, taskResponsible.innerText);
			if (loggedInUser == taskResponsible.innerText) {
				const editBtn = document.createElement('button');
				editBtn.innerText = 'Edit';
				const deleteBtn = document.createElement('button');
				deleteBtn.innerText = 'Delete';

				deleteBtn.addEventListener('click', () => {
					let index = a.indexOf(task);
					if (index > -1) tasks.splice(index, 1);
				});

				editBtn.addEventListener('click', () => {
					const idBox = document.getElementById('task-edit-id');
					idBox.value = task.id;
					idBox.setAttribute('disabled', 'disabled');
					document.getElementById('task-edit-description').value = task.description;
					document.getElementById('task-edit-status').value = task.status;
				});

				taskItem.appendChild(deleteBtn);
				taskItem.appendChild(editBtn);
			}

			taskList.appendChild(taskItem);
		});
		container.appendChild(taskList);
	}
};

displayTasks(tasks);
printTasks(tasks);

const editForm = document.getElementById('edit');
editForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const id = document.getElementById('task-edit-id').value;

	tasks.forEach((task) => {
		if (task.id == id) {
			task.description = document.getElementById('task-edit-description').value;
			task.status = document.getElementById('task-edit-status').value;
		}
	});
	displayTasks(tasks);
});

const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let user = {};
	user.email = document.getElementById('login-email').value.trim();
	user.password = document.getElementById('login-password').value.trim();

	let users = JSON.parse(localStorage.getItem('users'));
	let authenticated;
	let loggedInUser;

	users.forEach((item) => {
		if (item.name == user.name && item.password == user.password) {
			authenticated = true;
			loggedInUser = user.name;
		}
	});

	if (authenticated) {
		localStorage.setItem('authenticated', 'true');
		localStorage.setItem('loggedInUser', user.name);
	} else {
		localStorage.setItem('authenticated', 'false');
		localStorage.setItem('loggedInUser', '');
	}
	displayTasks(tasks);
});

const registerForm = document.getElementById('register');
registerForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let user = {};
	user.name = document.getElementById('register-name').value.trim();
	user.email = document.getElementById('register-email').value.trim();
	user.password = document.getElementById('register-password').value.trim();

	registerUser(user);
	displayTasks(tasks);
});

const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', () => {
	localStorage.setItem(JSON.stringify(tasks));
});

var bcrypt = dcodeIO.bcrypt;
console.log(bcrypt);
