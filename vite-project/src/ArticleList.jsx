import "./styles.css";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchArticleList } from "./api";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await fetchArticleList();
        setArticles(articlesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error caught:", error);
      }
    };
    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <p>
        Loading
      </p>
    );
  }

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
