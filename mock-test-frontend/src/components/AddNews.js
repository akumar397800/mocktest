import React, { useState } from 'react';
import axios from "axios";

const AddNews = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    exam: '',
    title: '',
    description: '',
    applyStartDate: '',
    applyEndDate: ''
  });
    const [response,setResponse]=useState("")

  // List of exams for the dropdown
  const exams = ['UPSC', 'CAT', 'GATE', 'NEET', 'JEE'];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

      // You can add logic here to send the data to an API or perform other actions
      try {
        // Send the data to the backend
        const response = await axios.post(
          "https://backend-syllabus-tracker.onrender.com/api/news",
          formData
        );
        setResponse(
          "Questions added successfully"
        );
      } catch (error) {
        setResponse("Error: " + error.message);
      }
    alert("News added successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Exam News</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Exam:</label>
          <select
            name="exam"
            value={formData.exam}
            onChange={handleInputChange}
            required
            style={styles.dropdown}
          >
            <option value="">Select an exam</option>
            {exams.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Apply Start Date:</label>
          <input
            type="datetime-local"
            name="applyStartDate"
            value={formData.applyStartDate}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Apply End Date:</label>
          <input
            type="datetime-local"
            name="applyEndDate"
            value={formData.applyEndDate}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Add News
        </button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
  },
  dropdown: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical'
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%'
  }
};

export default AddNews;