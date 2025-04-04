import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preferences: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      alert("User registered successfully! Token: " + response.data.token);
    } catch (error) {
      alert("Error: " + error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preferences (comma-separated):</label>
          <input
            type="text"
            name="preferences"
            value={formData.preferences}
            onChange={(e) =>
              setFormData({ ...formData, preferences: e.target.value.split(",") })
            }
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;