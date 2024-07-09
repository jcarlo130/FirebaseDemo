import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
// styles
import "./create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = { title, author, description };
    const ref = collection(db, "articles");
    await addDoc(ref, article);

    // setTitle("");
    // setAuthor("");
    // setDescription("");

    navigate("/");
  };

  return (
    <div className="create">
      <title>
        <h2 className="page-title">Add a New Article</h2>
        <hr />
      </title>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Author:</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Publish</button>
      </form>
    </div>
  );
}
