import { useParams } from "react-router-dom";
import { fetchSingleArticle, fetchArticleComments } from "./api";
import { useEffect, useState } from "react";
import "./styles.css";

const SingleArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleArticle(articleId);
        setArticle(data);
        const commentsData = await fetchArticleComments(articleId);
        setComments(commentsData);
        console.log(comments)
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

        <div className="comments-section">
          <h2>Comments ({comments.length})</h2>
          {comments.length > 0 ? (
            <ul className="comments-list">
              {comments.map((comment) => (
                <li key={comment.comment_id} className="comment-item">
                  <p className="comment-author">
                    <strong>{comment.author}</strong> says:
                  </p>
                  <p className="comment-body">{comment.body}</p>
                  <p className="comment-date">
                    Posted on:{" "}
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SingleArticle;
