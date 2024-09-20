import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import ArticleList from "./ArticleList";
import SingleArticle from './SingleArticle';

const App = () => {
  return (
    <>
      <Header />
      <br />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:articleId" element={<SingleArticle />} />
      </Routes>
    </>
  );
};

export default App;
