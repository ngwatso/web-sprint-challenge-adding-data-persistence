// !! build your `Task` model here
const db = require('../../data/dbConfig');

// ?? findAll ==> GET
async function findAll() {
	const tasks = await db('tasks as T')
		.leftJoin('projects as P', 'P.id', 'T.project_id')
		.select('T.*', 'P.project_name', 'P.project_description');

	const tasksObj = tasks.map((task) => {
		return {
			task_id: task.id,
			task_description: task.task_description,
			task_notes: !task.task_notes ? null : task.task_notes,
			task_completed: !task.task_completed
				? false
				: task.task_completed === 0
				? false
				: true,
			project_id: task.project_id,
			project_name: task.project_name,
			project_description: task.project_description,
		};
	});

	return tasksObj;
}

// ?? addTask ==> POST
async function addTask(taskData) {
	const [task_id] = await db('tasks')
		.join('projects', 'projects.id', 'tasks.project_id')
		.select('tasks.*', 'projects.id')
		.insert(taskData);

	const taskObj = {
		task_id: task_id,
		task_description: taskData.task_description,
		task_notes: !taskData.task_notes ? null : taskData.task_notes,
		task_completed: !taskData.task_completed
			? false
			: taskData.task_completed === 0
			? false
			: true,
		project_id: taskData.project_id,
	};

	return taskObj;
}

module.exports = { findAll, addTask };
