const Test = require('../models/Test');

// Add questions to a specific exam and year
exports.addQuestions = async (req, res) => {
  const { exam, year, questions } = req.body;
  console.log("Received data:", { exam, year, questions });
  try {
    let test = await Test.findOne({ exam, year });

    if (!test) {
      test = new Test({ exam, year, questions });
    } else {
      test.questions.push(...questions);
    }

      await test.save();
      console.log("Test saved successfully:", test);
    res.json({ msg: 'Questions added successfully', test });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get tests by exam and year
exports.getTests = async (req, res) => {
  const { exam, year } = req.params;
  try {
    const tests = await Test.find({ exam, year });
    res.json(tests);
  } catch (err) {
    res.status(500).send('Server error');
  }
};