// !! build your `Task` model here
const db = require('../../data/dbConfig');

// ?? findAll ==> GET
async function findAll() {
	return await db('tasks as T')
		.leftJoin('projects as P', 'P.id', 'T.project_id')
		.select('T.*', 'P.project_name', 'P.project_description');
}

// ?? addTask ==> POST
async function addTask(taskData) {
	return await db('tasks')
		.join('projects', 'projects.id', 'tasks.project_id')
		.select('tasks.*', 'projects.id')
		.insert(taskData);
}

module.exports = { findAll, addTask };
