import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchQuestions = () => {
  const [exam, setExam] = useState("CAT");
  const [year, setYear] = useState("2023");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tests/${exam}/${year}`
      );
      console.log(response.data)
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [exam, year]);

  return (
    <div>
      <h2>Fetch Questions</h2>
      <div>
        <label>Exam:</label>
        <input
          type="text"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <button onClick={fetchQuestions}>Fetch Questions</button>
      <div>
        {questions.map((test, index) => (
          <div key={index}>
            <h3>{test.exam} - {test.year}</h3>
            {test.questions.map((question, qIndex) => (
              <div key={qIndex}>
                <p><strong>Question:</strong> {question.question}</p>
                <p><strong>Options:</strong> {question.options.join(", ")}</p>
                <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchQuestions;