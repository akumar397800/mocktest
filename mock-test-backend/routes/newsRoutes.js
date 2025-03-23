const express = require("express");
const { getNewsByExam, postNews } = require("../controllers/newsController");
const router = express.Router();

router.get("/news/:exam", getNewsByExam); // Fetch news by exam
router.post("/news", postNews); // Post news

module.exports = router;
