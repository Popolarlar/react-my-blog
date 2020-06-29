import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  // Keep the state of user-name and comment-text
  const [username, setUsername] = useState();
  const [commentText, setCommentText] = useState();

  // The function to post the form when the button is clicked
  // fetch(`path`,{options})
  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: "post",
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // The api return the updated article
    const body = await result.json();

    // Trigger the root state change, which refreshs all the components
    setArticleInfo(body);

    // Reset the form
    setUsername("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment:</h3>

      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </label>

      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
      </label>

      <button onClick={() => addComment()}>Submit</button>
    </div>
  );
};

export default AddCommentForm;
