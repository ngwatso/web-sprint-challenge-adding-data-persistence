// !! build your `/api/resources` router here
const resourceRouter = require('express').Router();
const Resources = require('./model');
const ExpressError = require('../ExpressError');

// ?? GET ==> /api/resources ==> return response with all resources
resourceRouter.get('/', async (req, res, next) => {
	try {
		const resources = await Resources.findAll();
		res.status(200).json(resources);
	} catch (err) {
		next(err);
	}
});

// ?? POST ==> /api/resources ==> return response with newly created resource
resourceRouter.post('/', async (req, res, next) => {
	const resource = req.body;

	if (!resource.resource_name) {
		next(new ExpressError('new resources must contain a name', 404));
	} else {
		try {
			const newResource = await Resources.addResource(resource);
			res.status(200).json(newResource);
		} catch (err) {
			next(err);
		}
	}
});

module.exports = resourceRouter;
