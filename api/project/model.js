// !! build your `Project` model here
const db = require('../../data/dbConfig');

// ?? findAll ==> GET
function findAll() {
	return db('projects').select('*');
}

// ?? addResource ==> PUT
function addProject(projectData) {
	return db('projects').insert(projectData);
}

module.exports = { findAll, addProject };
