import Header from "./Navbar";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  useEffect(() => {
    //a function that runs when the page loads //api call to backend
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      //fetching response from backend
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/addUser", {
      name,
      age,
      username,
    }).then((response) => {
      alert("User Created");
      setListOfUsers([...listOfUsers, { name, age, username }]); //makes it show on page
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <div className="App">
        <Header />
        <div className="usersDisplay">
          {listOfUsers.map((user) => {
            return (
              <div>
                <h1>{user.name}</h1>
                <h1>{user.age}</h1>
                <h1>{user.username}</h1>
              </div>
            );
          })}
        </div>

        <div>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age..."
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="UserName..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={createUser}>Add User</button>
        </div>
      </div>
    </Router>
  );
}

export default App;
