import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
const withDB = async (operations) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      userNewUrlParser: true,
    });
    const db = client.db("my-blog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connection to db!", error });
  }
};

// Use the BODY PARSER to parse the JSON object in the REQUEST and add a BODY property to the REQUEST parameter
app.use(bodyParser.json());
// After that, we can use req.body.var to access JSON

// Set a GET endpoint
app.get("/api/articles/:name", async (req, res) => {
  const articleName = req.params.name;
  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    // Send JSON response
    res.status(200).json(articleInfo);
  });
});

// Set a POST endpoint(use URL params)
app.post("/api/articles/:name/upvote", async (req, res) => {
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );

    const updatedInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    // Send JSON response
    res.status(200).json(updatedInfo);
  });
});

// Set a POST endpoint(use body parser)
app.post("/api/articles/:name/add-comment", (req, res) => {
  const articleName = req.params.name;
  const { username, text } = req.body;

  articleInfo[articleName].comments.push({ username, text });

  res.status(200).send(articleInfo[articleName]);
});

// Start the server
// npx babel-node src/server.js
// http://localhost:8000/hello
app.listen(8000, () => console.log("Listening on port 8000!"));

// Use nodemon to automatically update server
// npx nodemon --exec npx babel-node src/server.js

// Put the script in package.json as "start"
// npm start
