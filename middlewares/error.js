module.exports = (app) => {
	app.use((_, __, next) => {
		let error = new Error('404 page not found');
		error.status = 404;
		next(error);
	});

	app.use((error, __, res, next) => {
		console.log(error);
		if (error.status === 404) {
			res.json({ error: error.message, status: error.status });
		} else {
			res.json({
				error: error.message,
				status: error.status || 500,
			});
		}
		console.log(error);
		next();
	});
};
