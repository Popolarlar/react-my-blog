import React, { useState, useEffect } from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  // Use useState HOOK to temporarily store information, and the component will re-render once it changes state
  const [articleInfo, SetArticleInfo] = useState({ upvotes: 0, comments: [] });

  // Use useEffect HOOK to perform the side effects of the component, fetching data, setting state
  // The second para is the watching list that only the members in the list will triger the useEffect. If the watching list is [], the useEffect will only be called once(when the page loaded)
  // useEffect HOOK do NOT allow an async function ex:useEffect(async () =>..
  useEffect(() => {
    const fetchData = async () => {
      // Add the proxy(http://localhost:8000) in package.json
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      SetArticleInfo(body);
    };

    fetchData();
  }, [name]);
  // In this case, whenever the name changes(different article) the useEffect will be called(changes the upvote number)

  if (!article) {
    return <NotFoundPage />;
  }

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <React.Fragment>
      <h1>{article.title}</h1>

      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={SetArticleInfo}
      />

      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}

      <CommentsList comments={articleInfo.comments} />

      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </React.Fragment>
  );
};

export default ArticlePage;
