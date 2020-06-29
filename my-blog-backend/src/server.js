import express from "express";
import bodyParser from "body-parser";

const app = express();

// Use the BODY PARSER to parse the JSON object in the REQUEST and add a BODY property to the REQUEST parameter
app.use(bodyParser.json());
// After that, we can use req.body.var to access JSON

// Set a GET endpoint
// app.REST_ACTION(PATH, REQUEST HANDLER(req, res))
app.get("/hello", (req, res) => res.send("Hello!"));

// Set a POST endpoint
app.post("/hello", (req, res) => res.send(`Hello, ${req.body.name}!`));

// Start the server
app.listen(8000, () => console.log("Listening on port 8000!"));

// npx babel-node src/server.js
// http://localhost:8000/hello
