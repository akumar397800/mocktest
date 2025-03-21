const Test = require('../models/Test');

// Add questions to a specific exam and year
exports.addQuestions = async (req, res) => {
  const { exam, year, shift, questions } = req.body;

  console.log("Received data:", { exam, year, shift, questions }); // Log the request body

  try {
    let test = await Test.findOne({ exam, year, shift });

    if (!test) {
      console.log("Creating new test document...");
      test = new Test({ exam, year, shift, questions });
    } else {
      console.log("Updating existing test document...");
      test.questions.push(...questions);
    }

    await test.save();
    console.log("Test saved successfully:", test); // Log the saved document
    res.json({ msg: "Questions added successfully", test });
  } catch (err) {
    console.error("Error saving test:", err); // Log the error
    res.status(500).send("Server error");
  }
};

//get the papaer of a particular shift.
exports.getPaperByShift = async (req, res) => {
  const { exam, year, shift } = req.params;

  try {
    const paper = await Test.findOne({ exam, year, shift });

    if (!paper) {
      return res.status(404).json({ msg: "Paper not found" });
    }

    res.json(paper);
  } catch (err) {
    console.error("Error fetching paper:", err);
    res.status(500).send("Server error");
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

// Fetch the list of available papers
exports.getAvailablePapers = async (req, res) => {
  try {
    const papers = await Test.aggregate([
      {
        $group: {
          _id: { exam: "$exam", year: "$year", shift: "$shift" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          exam: "$_id.exam",
          year: "$_id.year",
          shift: "$_id.shift",
        },
      },
    ]);

    res.json(papers);
  } catch (err) {
    console.error("Error fetching available papers:", err);
    res.status(500).send("Server error");
  }
};


