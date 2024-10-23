const URL = 'http://localhost:3000';

const checkAuthentication = () => {
	return localStorage.getItem('isAuthenticated') === 'true';
};

const getTasks = async () => {
	const res = await fetch(`${URL}/tasks`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	let tasks = await res.json();
	return tasks;
};

export const displayTasks = (tasks) => {
	const container = document.getElementById('task-container');
	container.innerHTML = '';
	container.style.display = 'block';

	if (tasks.length === 0) {
		const noTasksWarning = document.createElement('p');
		noTasksWarning.textContent = 'No tasks available';
		container.appendChild(noTasksWarning);
	} else {
		const taskList = document.createElement('ul');
		tasks.forEach((element) => {
			const taskItem = document.createElement('li');
			taskItem.style.display = 'flex';
			taskItem.style.flexWrap = 'wrap';
			taskItem.style.marginBottom = '10px';

			// Create a container div for the task details
			const taskDetails = document.createElement('div');
			taskDetails.style.display = 'flex';
			taskDetails.style.flexDirection = 'row';
			taskDetails.style.width = '100%';

			const taskId = document.createElement('div');
			taskId.textContent = 'ID: ' + element.id;
			taskId.style.width = '50px'; // Fixed width
			taskDetails.appendChild(taskId);

			const taskResponsible = document.createElement('div');
			taskResponsible.textContent = 'Responsible: ' + element.responsible;
			taskResponsible.style.width = '150px'; // Fixed width
			taskDetails.appendChild(taskResponsible);

			const taskDescription = document.createElement('div');
			taskDescription.textContent = 'Description: ' + element.description;
			taskDescription.style.width = '200px'; // Fixed width
			taskDetails.appendChild(taskDescription);

			const taskStatus = document.createElement('div');
			taskStatus.textContent = 'Status: ' + element.status;
			taskStatus.style.width = '100px'; // Fixed width
			taskDetails.appendChild(taskStatus);

			taskItem.appendChild(taskDetails);

			let username = localStorage.getItem('username') || '';

			// If the logged-in user is responsible for the task, add edit and delete buttons
			if ((checkAuthentication() && element.responsible === username) || element.responsible === 'Bogdan') {
				// Create a container div for the buttons
				const buttonContainer = document.createElement('div');
				buttonContainer.style.display = 'flex';
				buttonContainer.style.flexDirection = 'row';
				buttonContainer.style.marginTop = '5px';

				// Create Edit button
				const editButton = document.createElement('button');
				editButton.id = 'edit' + element.id;
				editButton.textContent = 'Edit';
				editButton.style.marginRight = '5px';
				buttonContainer.appendChild(editButton);

				// Add event listener to Edit button
				editButton.addEventListener('click', () => editTask(element.id));

				// Create Delete button
				const deleteButton = document.createElement('button');
				deleteButton.id = 'delete' + element.id;
				deleteButton.textContent = 'Delete';
				buttonContainer.appendChild(deleteButton);

				// Add event listener to Delete button
				deleteButton.addEventListener('click', () => deleteTask(element.id));

				taskItem.appendChild(buttonContainer);
			}

			taskList.appendChild(taskItem);
		});
		container.appendChild(taskList);
	}
};

export const editTask = async (id) => {
	console.log('You are editing the task with the id: ', id);
	const tasks = await getTasks();
	let taskToEdit;
	const descriptionField = document.getElementById('edit-task-description');
	const idField = document.getElementById('edit-task-id');
	const statusField = document.getElementById('edit-task-status');
	const responsibleField = document.getElementById('edit-task-responsible');

	tasks.forEach((task) => {
		if (task.id == id) {
			taskToEdit = task;
		}
	});

	descriptionField.value = taskToEdit.description;
	idField.value = taskToEdit.id;
	statusField.value = taskToEdit.status;
	responsibleField.value = taskToEdit.responsible;
};

const addTask = async () => {
	const descriptionField = document.getElementById('task-description');
	const idField = document.getElementById('task-id');
	const statusField = document.getElementById('task-status');
	const responsibleField = document.getElementById('task-responsible');

	let task = {
		id: idField.value,
		description: descriptionField.value,
		status: statusField.value,
		responsible: responsibleField.value,
	};

	fetch(`${URL}/add-task`, {
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
};

export const deleteTask = (id) => {
	console.log('You are deleting the task with the id: ', id);
};
