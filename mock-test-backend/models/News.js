const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  exam: { type: String, required: true }, // e.g., CAT, GRE, UPSC
  title: { type: String, required: true }, // News title
  description: { type: String, required: true }, // News description
  applyStartDate: { type: Date, required: true }, // Application start date
  applyEndDate: { type: Date, required: true }, // Application end date
  date: { type: Date, default: Date.now }, // News publish date
});

module.exports = mongoose.model("News", newsSchema);