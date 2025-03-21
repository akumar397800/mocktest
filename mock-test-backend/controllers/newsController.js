const News = require("../models/News");

// Fetch news for a specific exam
exports.getNewsByExam = async (req, res) => {
  const { exam } = req.params;

  try {
    const news = await News.find({ exam }).sort({ date: -1 }); // Sort by date (newest first)

    if (!news || news.length === 0) {
      return res.status(404).json({ msg: "No news found for this exam" });
    }

    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).send("Server error");
  }
};

// Post news for an exam
exports.postNews = async (req, res) => {
  const { exam, title, description, applyStartDate, applyEndDate } = req.body;

  try {
    // Create a new news document
    const news = new News({
      exam,
      title,
      description,
      applyStartDate,
      applyEndDate,
    });

    // Save the news to the database
    await news.save();

    res.json({ msg: "News posted successfully", news });
  } catch (err) {
    console.error("Error posting news:", err);
    res.status(500).send("Server error");
  }
};