import React, { useState } from "react";
import axios from "axios";

const AddQuestions = () => {
  const [formData, setFormData] = useState({
    exam: "",
    year: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "question" || name === "correctAnswer") {
      const updatedQuestions = [...formData.questions];
      updatedQuestions[index][name] = value;
      setFormData({ ...formData, questions: updatedQuestions });
    } else if (name.startsWith("option")) {
      const optionIndex = parseInt(name.split("-")[1], 10);
      const updatedQuestions = [...formData.questions];
      updatedQuestions[index].options[optionIndex] = value;
      setFormData({ ...formData, questions: updatedQuestions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tests/add-questions",
        formData
      );
      alert("Questions added successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Add Questions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exam:</label>
          <input
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <div>
              <label>Question:</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
            <div>
              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  name={`option-${optionIndex}`}
                  value={option}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              ))}
            </div>
            <div>
              <label>Correct Answer:</label>
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        {/* <button type="button" onClick={addQuestion}>
          Add Another Question
        </button> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuestions;
