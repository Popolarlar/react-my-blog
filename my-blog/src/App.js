import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./NavBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      // Router wraps all the routes
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            {/* Switch makes sure only one(first match) of the routes is rendered at a time */}
            <Switch>
              {/* Route sets the path and which component to be rendered */}
              <Route path="/" exact component={HomePage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/article-list" exact component={ArticleListPage} />
              <Route path="/article/:name" exact component={ArticlePage} />

              {/* Default path needs to be placed last, otherwise it'll always match to */}
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
