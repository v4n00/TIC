const taskManager = (() => {
	let tasks = [
		{
			id: 1,
			responsible: 'Mihai',
			description: 'do the dishes',
			status: 'pending',
		},
		{
			id: 2,
			responsible: 'Elena',
			description: 'do homework',
			status: 'done',
		},
		{
			id: 3,
			responsible: 'Cosmin',
			description: 'buy Electric Castle tickets',
			status: 'in progress',
		},
	];

	return {
		getTasks: () => tasks,
		addTasks: (task) => {
			console.log(task);
			tasks.push(task);
			return task;
		},
		editTask: (task) => {
			tasks.forEach((t) => {
				if (t.id == task.id) {
					console.log('AM GASIT');
					t.responsible = task.responsible;
					t.description = task.description;
					t.status = task.status;
				}
			});

			console.log(tasks);
			return task;
		},
	};
})();

export { taskManager };
