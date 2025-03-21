const express = require('express');
const { addQuestions, getTests, getPaperByShift,
    getAvailablePapers } = require('../controllers/testController');
const router = express.Router();

router.post('/add-questions', addQuestions);
// router.get('/:exam/:year', getTests);

router.get('/paper/:exam/:year/:shift', getPaperByShift);
router.get("/papers", getAvailablePapers);


module.exports = router;