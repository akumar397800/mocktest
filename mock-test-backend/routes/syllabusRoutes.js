const express = require("express");
const { getSyllabus,addOrUpdateSyllabus } = require("../controllers/syllabusController");
const router = express.Router();

router.get("/:exam", getSyllabus);
router.post("/syllabus", addOrUpdateSyllabus);

module.exports = router;