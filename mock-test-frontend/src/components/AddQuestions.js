import React, { useState } from "react";
import axios from "axios";

const AddQuestions = () => {
  const [exam, setExam] = useState("");
  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      hasImage: false, // New field to track if the question has an image
    },
  ]);
  const [response, setResponse] = useState("");

  // Handle changes in exam, year, and shift
  const handleExamChange = (e) => setExam(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleShiftChange = (e) => setShift(e.target.value);

  // Handle changes in question fields
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes in options
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes in the "hasImage" checkbox
  const handleHasImageChange = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].hasImage = !updatedQuestions[index].hasImage;
    // Clear options if the question has an image
    if (updatedQuestions[index].hasImage) {
      updatedQuestions[index].options = ["", "", "", ""];
      updatedQuestions[index].correctAnswer = "";
    }
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        hasImage: false,
      },
    ]);
  };

  // Delete a question
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const data = {
      exam,
      year,
      shift,
      questions,
    };

    try {
      // Send the data to the backend
      const response = await axios.post(
        "https://backend-syllabus-tracker.onrender.com/api/tests/add-questions",
        data
      );
      setResponse(
        "Questions added successfully: " 
        // + JSON.stringify(response.data)
      );
      alert("Question added succesfully")
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  // Inline CSS
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      gap: "10px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "#fff",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginRight: "10px",
    },
    deleteButton: {
      padding: "10px 15px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    response: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      color: "#333",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    checkbox: {
      marginRight: "10px",
    },
  };

  // Dropdown options
  const examOptions = ["CAT", "GRE", "UPSC", "GMAT"];
  const yearOptions = ["2023", "2022", "2021", "2020"];

  const shiftOptions = ["Shift 1", "Shift 2", "Shift 3"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Questions</h2>
      <form onSubmit={handleSubmit}>
        {/* Exam, Year, and Shift Dropdowns in a Single Row */}
        <div style={styles.formGroup}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Exam:</label>
            <select
              value={exam}
              onChange={handleExamChange}
              style={styles.select}
              required
            >
              <option value="">Select Exam</option>
              {examOptions.map((examOption, index) => (
                <option key={index} value={examOption}>
                  {examOption}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Year:</label>
            <select
              value={year}
              onChange={handleYearChange}
              style={styles.select}
              required
            >
              <option value="">Select Year</option>
              {yearOptions.map((yearOption, index) => (
                <option key={index} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Shift:</label>
            <select
              value={shift}
              onChange={handleShiftChange}
              style={styles.select}
              required
            >
              <option value="">Select Shift</option>
              {shiftOptions.map((shiftOption, index) => (
                <option key={index} value={shiftOption}>
                  {shiftOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions */}
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#333" }}>Question {questionIndex + 1}</h3>

            {/* Checkbox for Image */}
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={question.hasImage}
                onChange={() => handleHasImageChange(questionIndex)}
                style={styles.checkbox}
              />
              <label>This question has an image</label>
            </div>

            {/* Question Input */}
            <div style={styles.formGroup}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Question:</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      "question",
                      e.target.value
                    )
                  }
                  placeholder="Enter the question"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Options (Hidden if hasImage is true) */}
            {!question.hasImage && (
              <>
                {/* Options */}
                <div style={styles.formGroup}>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} style={{ flex: 1 }}>
                      <label style={styles.label}>
                        Option {optionIndex + 1}:
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        style={styles.input}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer */}
                <div style={styles.formGroup}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Correct Answer:</label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      placeholder="Enter the correct option"
                      style={styles.input}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Delete Question Button */}
            <button
              type="button"
              onClick={() => deleteQuestion(questionIndex)}
              style={styles.deleteButton}
            >
              Delete Question
            </button>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Add Another Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </form>

      {/* Response Message */}
      {/* {response && <p style={styles.response}>{response}</p>} */}
    </div>
  );
};

export default AddQuestions;
