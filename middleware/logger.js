//custom middleware - logger

module.exports = (req, res, next) => {
	const { method, url } = req;

	console.log(`${new Date().toISOString()} ${method} ${url}`);
	next();
};
