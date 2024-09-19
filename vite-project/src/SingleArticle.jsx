import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "./api";
import { useEffect } from "react";
import { useState } from "react";
import './styles.css'
const SingleArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleArticle(articleId);
        setArticle(data);
      } catch (error) {
        console.log("Error fetching article: ", error);
      }
    };
    fetchData();
  }, [articleId]);

  return (
    <div className="singleArticle">
      <div className="single-image-container">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      </div>
      <div className="article-content-container">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-topic">
          <strong>Topic:</strong> {article.topic}
        </p>
        <p className="article-date">
          <strong>Published:</strong>{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>

        <div className="article-body">
          <p>{article.body}</p> 
        </div>

        <div className="article-votes-comments">
          <p className="article-votes">
            <strong>Votes:</strong> {article.votes}
          </p>
          <p className="article-comments">
            <strong>Comments:</strong> {article.comment_count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
