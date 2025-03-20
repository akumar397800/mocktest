const express = require('express');
const { addQuestions, getTests } = require('../controllers/testController');
const router = express.Router();

router.post('/add-questions', addQuestions);
router.get('/:exam/:year', getTests);

module.exports = router;