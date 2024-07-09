import { useNavigate, Link } from "react-router-dom";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/pen.svg";

// Styles
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = collection(db, "articles");

    onSnapshot(ref, (snapshot) => {
      console.log(snapshot);
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    getDocs(ref).then((snapshot) => {
      let results = [];
      console.log(snapshot);
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });
  }, []);

  const handleDelete = async (id) => {
    const ref = doc(db, "articles", id);
    //loading = true
    deleteDoc(ref)
      .then
      //loading false;
      ();
  };

  return (
    <div className="home">
      <title>
        <h2>Articles</h2>
        <hr />
      </title>
      {articles &&
        articles.map((article) => (
          <div key={article.id} className="card">
            <h3 className="articleTitle">{article.title}</h3>
            <p>Written by {article.author}</p>
            <Link className="linkFull" to={`/articles/${article.id}`}>
              Read Full Article
            </Link>
            <img
              className="icon"
              id="deleteIcon"
              onClick={() => handleDelete(article.id)}
              src={DeleteIcon}
              alt="delete icon"
            />
            <img
              className="icon"
              id="editIcon"
              onClick={() => navigate(`/editArticle/${article.id}`)}
              src={EditIcon}
              alt="edit icon"
            />
          </div>
        ))}
    </div>
  );
}
