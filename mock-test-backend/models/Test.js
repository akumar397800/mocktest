const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  exam: { type: String, required: true }, // e.g., CAT, GRE
  year: { type: String, required: true }, // e.g., 2022, 2023
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);