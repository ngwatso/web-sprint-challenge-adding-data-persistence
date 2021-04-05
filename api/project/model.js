// !! build your `Project` model here
const db = require('../../data/dbConfig');

// ?? findAll ==> GET
async function findAll() {
	const projects = await db('projects').select('*');

	const projectsObj = projects.map((project) => {
		return {
			project_id: project.id,
			project_name: project.project_name,
			project_description: project.project_description,
			project_completed: !project.project_completed
				? false
				: project.project_completed === 0
				? false
				: true,
		};
	});

	return projectsObj;
}

// ?? addProject ==> PUT
async function addProject(project) {
	const [project_id] = await db('projects').insert(project);

	const projectObj = {
		project_id: project_id,
		project_name: project.project_name,
		project_description: project.project_description,
		project_completed: !project.project_completed
			? false
			: project.project_completed === 0
			? false
			: true,
	};
	return projectObj;
}

module.exports = { findAll, addProject };
