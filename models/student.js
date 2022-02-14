module.exports = (sequelize, Sequelize) => {
	const Tutorial = sequelize.define('students', {
		name: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING },
	});

	return Tutorial;
};
