import "./styles.css";
import { Link } from "react-router-dom";

const ArticleCard = ({
  title,
  article_img_url,
  comment_count,
  created_at,
  topic,
  votes,
  article_id,
}) => {
  return (
    <Link to={`/articles/${article_id}`} className="article-card">
      <div className="article-card">
        <div className="article-details">
          <h2>{title}</h2>
          <p>
            <strong>Topic: </strong>
            {topic}
          </p>
          <p>
            <strong>Published: </strong>
            {new Date(created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Votes: </strong> {votes} | <strong> Comments: </strong>{" "}
            {comment_count}
          </p>
        </div>
        <div className="article-thumbnail">
          <img src={article_img_url} alt={title} />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
