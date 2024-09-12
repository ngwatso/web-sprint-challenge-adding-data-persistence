// !! start your server here
const server = require('./api/server');

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
	console.log(`\n *** server listening on port ${PORT} *** \n`);
});
