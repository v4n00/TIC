//server app
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
const { taskManager } = require('./taskManagement');
const { userManager } = require('./userManagement');
const port = 3000;

app.use(httpLogger('dev'));
app.use(cors()); //see more at https://www.npmjs.com/package/cors
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //we expect JSON data to be sent as payloads

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/data', (req, res) => {
	let data = req.body;
	console.log('trying to post the following data: ', data);
	res.send('Succes');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

app.get('/tasks', (_, res) => {
	let tasks = taskManager.getTasks();
	res.status(200).send(tasks);
});

app.post('/users', (req, res) => {
	let userToAdd = userManager.registerUser(req.body);
	console.log(`New user to add: ${JSON.stringify(userToAdd)}`);
	res.status(201).send(userToAdd);
});

app.post('/edit-task', (req, res) => {
	let taskToEdit = taskManager.editTask(req.body);
	console.log(`Task to edit: ${JSON.stringify(taskToEdit)}`);
	res.status(201).send(taskToEdit);
});

app.post('/add-task', (req, res) => {
	let taskToAdd = taskManager.addTasks(req.body);
	console.log(`Task to add: ${JSON.stringify(taskToAdd)}`);
	res.status(201).send(taskToAdd);
});
