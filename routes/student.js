const express = require('express');
const router = express.Router();
const students = require('../controllers/student');

router.get('/', students.getStudent);

module.exports = router;
