const express = require('express');
const { addQuestions, getTests, getPaperByShift,
    getAvailablePapers,getAvailableExams,getAvailablePapersForExam } = require('../controllers/testController');
const router = express.Router();

router.post('/add-questions', addQuestions);
// router.get('/:exam/:year', getTests);

router.get('/exam/:exam/:year/:shift', getPaperByShift);
// router.get("/paper", getAvailablePapers);
router.get("/exam", getAvailableExams)
router.get("/exam/:exam", getAvailablePapersForExam);


module.exports = router;