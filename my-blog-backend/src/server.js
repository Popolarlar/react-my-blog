import express from "express";
import bodyParser from "body-parser";

const articleInfo = {
  "learn-react": {
    upvotes: 0,
  },
  "learn-node": {
    upvotes: 0,
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
  },
};

const app = express();

// Use the BODY PARSER to parse the JSON object in the REQUEST and add a BODY property to the REQUEST parameter
app.use(bodyParser.json());
// After that, we can use req.body.var to access JSON

// Set a GET endpoint
// app.get("/hello", (req, res) => res.send("Hello!"));

// Set a POST endpoint(use boby parser)
// app.post("/hello", (req, res) => res.send(`Hello, ${req.body.name}!`));

// Set a GET endpoint(use URL params)
app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articleInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `${articleName} now has ${articleInfo[articleName].upvotes} upvotes!`
    );
});

// Start the server
// npx babel-node src/server.js
// http://localhost:8000/hello
app.listen(8000, () => console.log("Listening on port 8000!"));

// Use nodemon to automatically update server
// npx nodemon --exec npx babel-node src/server.js

// Put the script in package.json as "start"
// npm start
