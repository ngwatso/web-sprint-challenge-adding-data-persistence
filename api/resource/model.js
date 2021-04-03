// !! build your `Resource` model here
const db = require('../../data/dbConfig');

// ?? findAll ==> GET
async function findAll() {
	return await db('resources').select('*');
}

// ?? addResource ==> PUT
async function addResource(resourceData) {
	return await db('resources').insert(resourceData);
}

module.exports = { findAll, addResource };
