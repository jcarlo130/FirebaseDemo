import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom/dist";

function Register({ setShowRegistered }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      console.log("User Registered Successfully!!");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Register-container">
      <form onSubmit={handleRegister} className="Register form">
        <h2 className="register">Sign Up</h2>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>

      <div className="login-link">
        <p>
          Already registered?{" "}
          <button
            className="btn btn-secondary"
            onClick={() => setShowRegistered(false)}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
