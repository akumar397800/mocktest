import React, { useState } from 'react';
import axios from "axios";

const AddSyllabus = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    exam: '',
    subjects: [
      {
        subjectName: '',
        topics: ['']
      }
    ]
  });
    const [response,setResponse]=useState("")

  // List of exams for the dropdown
  const exams = ['CAT', 'UPSC', 'GATE', 'NEET', 'JEE'];

  // Handle changes in the exam name
  const handleExamChange = (e) => {
    setFormData({
      ...formData,
      exam: e.target.value
    });
  };

  // Handle changes in subject names
  const handleSubjectNameChange = (index, e) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index].subjectName = e.target.value;
    setFormData({
      ...formData,
      subjects: newSubjects
    });
  };

  // Handle changes in topics
  const handleTopicChange = (subjectIndex, topicIndex, e) => {
    const newSubjects = [...formData.subjects];
    newSubjects[subjectIndex].topics[topicIndex] = e.target.value;
    setFormData({
      ...formData,
      subjects: newSubjects
    });
  };

  // Add a new subject
  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        {
          subjectName: '',
          topics: ['']
        }
      ]
    });
  };

  // Delete a subject
  const deleteSubject = (subjectIndex) => {
    const newSubjects = formData.subjects.filter((_, index) => index !== subjectIndex);
    setFormData({
      ...formData,
      subjects: newSubjects
    });
  };

  // Add a new topic to a subject
  const addTopic = (subjectIndex) => {
    const newSubjects = [...formData.subjects];
    newSubjects[subjectIndex].topics.push('');
    setFormData({
      ...formData,
      subjects: newSubjects
    });
  };

  // Delete a topic from a subject
  const deleteTopic = (subjectIndex, topicIndex) => {
    const newSubjects = [...formData.subjects];
    newSubjects[subjectIndex].topics = newSubjects[subjectIndex].topics.filter(
      (_, index) => index !== topicIndex
    );
    setFormData({
      ...formData,
      subjects: newSubjects
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Syllabus Data Submitted:", formData);

    // You can add logic here to send the data to an API or perform other actions
    try {
        // Send the data to the backend
        const response = await axios.post(
          "https://backend-syllabus-tracker.onrender.com/api/syllabus",
          formData
        );
        setResponse(
          "Syllabus added successfully"
        );
        alert("Syllabus added successfully!");
      } catch (error) {
        setResponse("Error: " + error.message);
        alert("Something error try after sometime");
      }
   
      
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Syllabus</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Exam Name:</label>
          <select
            name="exam"
            value={formData.exam}
            onChange={handleExamChange}
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

        {formData.subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex} style={styles.subject}>
            <h3 style={styles.subjectHeading}>Subject {subjectIndex + 1}</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject Name:</label>
              <input
                type="text"
                value={subject.subjectName}
                onChange={(e) => handleSubjectNameChange(subjectIndex, e)}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => deleteSubject(subjectIndex)}
                style={styles.deleteButton}
              >
                Delete Subject
              </button>
            </div>

            <div>
              <h4 style={styles.topicHeading}>Topics</h4>
              {subject.topics.map((topic, topicIndex) => (
                <div key={topicIndex} style={styles.topic}>
                  <label style={styles.label}>Topic {topicIndex + 1}:</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => handleTopicChange(subjectIndex, topicIndex, e)}
                    required
                    style={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => deleteTopic(subjectIndex, topicIndex)}
                    style={styles.deleteButton}
                  >
                    Delete Topic
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTopic(subjectIndex)}
                style={styles.button}
              >
                Add Topic
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSubject}
          style={styles.button}
        >
          Add Subject
        </button>

        <button type="submit" style={styles.submitButton}>
          Submit Syllabus
        </button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    textAlign: 'center',
    color: '#333'
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
    fontSize: '16px',
    marginBottom: '10px'
  },
  dropdown: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '10px'
  },
  subject: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff'
  },
  subjectHeading: {
    color: '#333',
    marginBottom: '10px'
  },
  topicHeading: {
    color: '#555',
    marginBottom: '10px'
  },
  topic: {
    marginBottom: '10px'
  },
  button: {
    padding: '8px 12px',
    marginRight: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
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

export default AddSyllabus;