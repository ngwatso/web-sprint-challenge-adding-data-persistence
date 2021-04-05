// !! build your `/api/projects` router here
const projectRouter = require('express').Router();
const Projects = require('./model');
const ExpressError = require('../ExpressError');

// ?? GET ==> /api/projects ==> return response with all projects
projectRouter.get('/', async (req, res, next) => {
	try {
		const projects = await Projects.findAll();
		res.status(200).json(projects);
	} catch (err) {
		next(err);
	}
});

// ?? POST ==> /api/projects ==> return response with newly created project
projectRouter.post('/', async (req, res, next) => {
	const project = req.body;

	if (!project.project_name) {
		next(new ExpressError('new projects must contain a name', 404));
	} else {
		try {
			const newProject = await Projects.addProject(project);
			res.status(200).json(newProject);
		} catch (err) {
			next(err);
		}
	}
});

module.exports = projectRouter;
