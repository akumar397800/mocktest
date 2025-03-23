import React from "react";
import UserRegistration from "./components/UserRegistration";
import AddQuestions from "./components/AddQuestions";
import FetchQuestions from "./components/FetchQuestions";
import AddNews from "./components/AddNews";
import Home from "./components/Home";

import AddSyllabus from "./components/AddSyllabus";

  
function App() {
  
  return (
    <div className="App">
      <h1>Mock Test App</h1>
      {/* <UserRegistration /> */}
      {/* <AddQuestions /> */}
      {/* <AddNews />
      <AddSyllabus/> */}
      {/* <FetchQuestions/> */}
      <Home/>
    </div>
  );
}

export default App;