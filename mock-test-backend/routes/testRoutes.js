const express = require('express');
const { addQuestions, getTests, getPaperByShift,
    getAvailablePapers,getAvailableExams } = require('../controllers/testController');
const router = express.Router();

router.post('/add-questions', addQuestions);
// router.get('/:exam/:year', getTests);

router.get('/paper/:exam/:year/:shift', getPaperByShift);
router.get("/paper", getAvailablePapers);
router.get("/exams",getAvailableExams)


module.exports = router;