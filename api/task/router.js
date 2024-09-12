// !! build your `/api/tasks` router here
const taskRouter = require('express').Router();
const Tasks = require('./model');
const ExpressError = require('../ExpressError');

// ?? GET ==> /api/tasks ==> return response with all tasks
taskRouter.get('/', async (req, res, next) => {
	try {
		const tasks = await Tasks.findAll();
		res.status(200).json(tasks);
	} catch (err) {
		next(err);
	}
});

// ?? POST ==> /api/tasks ==> return response with newly created task
taskRouter.post('/', async (req, res, next) => {
	const task = req.body;

	if (!task.project_id || !task.task_description) {
		next(
			new ExpressError(
				'new tasks must contain description and project ID',
				404
			)
		);
	} else {
		try {
			const newTask = await Tasks.addTask(task);
			res.status(200).json(newTask);
		} catch (err) {
			next(err);
		}
	}
});

module.exports = taskRouter;
