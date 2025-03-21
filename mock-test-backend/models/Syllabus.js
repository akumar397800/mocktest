const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
  exam: { type: String, required: true, unique: true }, // e.g., CAT, GRE, UPSC
  subjects: [
    {
      subjectName: { type: String, required: true }, // e.g., Quantitative Aptitude
      topics: { type: [String], required: true }, // List of topics for the subject
    },
  ],
});

module.exports = mongoose.model("Syllabus", syllabusSchema);