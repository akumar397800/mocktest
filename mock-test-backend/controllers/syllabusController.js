const Syllabus = require("../models/Syllabus");

exports.getSyllabus = async (req, res) => {
  const { exam } = req.params;

  try {
    // Find the syllabus for the specified exam
    const syllabus = await Syllabus.findOne({ exam });

    if (!syllabus) {
      return res.status(404).json({ msg: "Syllabus not found" });
    }

    // Return the syllabus
    res.json(syllabus);
  } catch (err) {
    console.error("Error fetching syllabus:", err);
    res.status(500).send("Server error");
  }
};

exports.addOrUpdateSyllabus = async (req, res) => {
    const { exam, subjects } = req.body;
  
    try {
      // Check if the syllabus already exists
      let syllabus = await Syllabus.findOne({ exam });
  
      if (syllabus) {
        // Update the existing syllabus
        syllabus.subjects = subjects;
      } else {
        // Create a new syllabus
        syllabus = new Syllabus({ exam, subjects });
      }
  
      // Save the syllabus
      await syllabus.save();
  
      res.json({ msg: "Syllabus added/updated successfully", syllabus });
    } catch (err) {
      console.error("Error adding/updating syllabus:", err);
      res.status(500).send("Server error");
    }
  };