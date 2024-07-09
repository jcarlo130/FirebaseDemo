import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import Register from "./Register";
import "./login.css";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistered, setShowRegistered] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      setLoggedIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!showRegistered ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login">Login</h2>

          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="Forgot Password text-center">
            New user?{" "}
            <button
              type="button"
              className="signup-link"
              onClick={() => setShowRegistered(true)}
            >
              Sign up here!
            </button>
          </p>
        </form>
      ) : (
        <Register
          setLoggedIn={setLoggedIn}
          setShowRegistered={setShowRegistered}
        />
      )}
    </div>
  );
}

export default Login;
