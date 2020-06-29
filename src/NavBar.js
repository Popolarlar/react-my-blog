import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul>
      {/* Don't use anchor as linke in react
      <li>
        <a href="...">Home</a>
      </li> */}

      {/* Use Link in react-router-dom instead */}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/article-list">Articles</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
