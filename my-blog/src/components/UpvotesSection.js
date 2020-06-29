import React from "react";

const UpvotesSection = ({ articleName, upvotes, setArticleInfo }) => {
  // The function to post when the button is clicked
  // fetch(`path`,{options})
  const upvoteArticle = async () => {
    const result = await fetch(`/api/articles/${articleName}/upvote`, {
      method: "post",
    });

    // The api return the updated article
    const body = await result.json();

    // Trigger the root state change, which refreshs all the components
    setArticleInfo(body);
  };

  return (
    <div id="upvotes-section">
      <button onClick={() => upvoteArticle()}>Upvote!</button>
      <p>This post has been upvoted {upvotes} times</p>
    </div>
  );
};

export default UpvotesSection;
