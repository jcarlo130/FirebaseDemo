import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

// Styles
import "./article.css"

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();

  console.log("id: " + urlId);

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const ref = doc(db, "articles", urlId);
    getDoc(ref).then((snapshot) => {
      setArticle(snapshot.data());
    });
  }, []);

  return (
    <div className="articleDiv">
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2 className="title">
            {article.title}{" "}
          </h2>{" "}
          <p className="author">By <span>{article.author}</span></p>
          <p className="decription">{article.description}</p>
        </div>
      )}
    </div>
  );
}
