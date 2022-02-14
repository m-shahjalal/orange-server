const db = require('../models');
const Student = db.students;
const { Op } = require('sequelize');

const controller = {};
controller.getStudent = async (req, res, next) => {
	const pageAsNumber = parseInt(req.query.page) - 1;
	const sizeAsNumber = parseInt(req.query.size);

	const searchQuery = req.query.search?.toLowerCase() || '';

	let page = 0;
	let size = 10;

	if (!isNaN(pageAsNumber) && pageAsNumber > 0) {
		page = pageAsNumber;
	}

	!isNaN(sizeAsNumber) &&
		!(sizeAsNumber > 50) &&
		!(sizeAsNumber < 1) &&
		(size = sizeAsNumber);

	const findObject = {
		limit: size,
		attributes: ['name', 'email', 'id'],
		offset: page * size,
		where: {
			[Op.or]: [
				{ name: { [Op.like]: `%${searchQuery}%` } },
				{ email: { [Op.like]: `%${searchQuery}%` } },
			],
		},
	};

	try {
		const students = await Student.findAndCountAll(findObject);
		console.log(students.count);
		res.status(200).json({
			content: students.rows,
			totalPages: Math.ceil(students.count / parseInt(size)),
		});
	} catch (error) {
		next(error);
	}
};

controller.searchStudents = async (req, res, next) => {
	const str = req.query.search;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	// TODO: constructing mood

	const search = {
		$or: [
			{ name: { $regex: str, $options: 'i' } },
			{ email: { $regex: str, $options: 'i' } },
		],
	};

	try {
		const count = await Student.countDocuments(search);
		const students = await Student.find(search);
		const pages = Math.ceil(count / limit);
		res.json({ skip, page, limit, pages, total: count, students });
	} catch (error) {
		next(error);
	}
};

module.exports = controller;
