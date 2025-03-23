import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddNews from './AddNews';
import AddSyllabus from './AddSyllabus';
import AddQuestions from './AddQuestions';

const Home = () => {
  return (
    <Router>
      <div style={styles.container}>
        {/* Menu Bar */}
        <nav style={styles.navbar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/add-news" style={styles.navLink}>
                Add News
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/add-syllabus" style={styles.navLink}>
                Add Syllabus
              </Link>
                      </li>
                      <li style={styles.navItem}>
              <Link to="/add-question" style={styles.navLink}>
                Add Paper
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <div style={styles.content}>
          <Routes>
            <Route path="/add-news" element={<AddNews />} />
                      <Route path="/add-syllabus" element={<AddSyllabus />} />
                      <Route path="/add-question" element={<AddQuestions />} />
                      
            <Route path="/" element={<h2 style={styles.welcomeMessage}>Welcome to the Exam Portal</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Inline styles
const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    navbar: {
      backgroundColor: '#007bff',
      padding: '10px 0',
      width: '100%',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
      padding: '0',
      margin: '0',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    navItem: {
      margin: '0 20px' // Increased spacing between menu items
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px 15px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
      ':hover': {
        backgroundColor: '#0056b3'
      }
    },
    content: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    welcomeMessage: {
      textAlign: 'center',
      color: '#333',
      marginTop: '20px'
    }
  };

export default Home;