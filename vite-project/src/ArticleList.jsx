import "./styles.css";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-project-u7dc.onrender.com/api/articles/")
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => console.log(error, "-- Error caught"));
  }, []);

  return (
    <div>
      <ul className="article-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.article_id}
              article_id={article.article_id}
              title={article.title}
              article_img_url={article.article_img_url}
              comment_count={article.comment_count}
              created_at={article.created_at}
              topic={article.topic}
              votes={article.votes}
            />
          ))
        ) : (
          <p>No articles found</p>
        )}
      </ul>
    </div>
  );
};

export default ArticleList;
