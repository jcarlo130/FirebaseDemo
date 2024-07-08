import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EditIcon from "../assets/pen.svg";

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

  // if (!article) {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // }

  return (
    <div className="articleDiv">
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2>
            {article.title}{" "}
            <img
              className="icon"
              id="editIcon"
              onClick={() => navigate(`/editArticle/${article.id}`)}
              src={EditIcon}
              alt="edit icon"
            />
          </h2>{" "}
          <p>By <span>{article.author}</span></p>
          <p>{article.description}</p>
        </div>
      )}
    </div>
  );
}
