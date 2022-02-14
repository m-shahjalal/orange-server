const student = require('./student');

module.exports = (app) => {
	app.use('/students', student);
	app.get('/', (_, res) => res.json({ message: 'Hello orangetoolz!' }));
};
