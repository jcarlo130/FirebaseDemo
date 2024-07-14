import "./App.css";
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import {
  BrowserRouter,
  Route,
  NavLink,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import React, { useState } from "react";

// Pages

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Article from "./pages/Article";
import FormArticle from "./pages/FormArticle";
import EditArticle from "./pages/EditArticle";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { auth } from "./firebase/config";
import { signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        {loggedIn ? (
          <>
            <div className="navContainer">
              <nav>
                <h1>My Articles</h1>
                <div className="navItems">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/new">New Article</NavLink>
                  <button classname='signout' onClick={handleSignOut}>Sign Out</button>
                </div>
              </nav>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles/:urlId" element={<Article />} />
              <Route path="/new" element={<FormArticle />} />
              <Route path="/editArticle/:id" element={<EditArticle />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
