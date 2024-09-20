import { useParams } from "react-router-dom";
import {
  fetchSingleArticle,
  fetchArticleComments,
  patchArticleVotes,
} from "./api";
import { useEffect, useState } from "react";
import "./styles.css";

const SingleArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleArticle(articleId);
        setArticle(data);
        const commentsData = await fetchArticleComments(articleId);
        setComments(commentsData);
      } catch (error) {
        console.log("Error fetching article: ", error);
      }
    };
    fetchData();
  }, [articleId]);

  const handleVote = async (change) => {
    try {
      // Ensure the current votes are a valid number before performing arithmetic
      const currentVotes =
        article.votes !== undefined ? Number(article.votes) : 0;

      // Optimistically update the vote count before the server response
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: currentVotes + change, // Safely add the vote change
      }));

      // Send the PATCH request to the backend to persist the vote change
      const updatedArticle = await patchArticleVotes(articleId, change);

      // Ensure that the final vote count is updated after the response
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: updatedArticle.article.votes, // Use the confirmed vote count from the server
      }));
    } catch (error) {
      console.log(error, "Error voting");
    }
  };

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
          <div className="vote-buttons">
            <button onClick={() => handleVote(1)}>Upvote</button>
            <button onClick={() => handleVote(-1)}>Downvote</button>
          </div>
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
