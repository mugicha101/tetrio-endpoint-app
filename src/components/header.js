import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="masthead">
    <div>
      <div>
        <Link to="/">
          <h1 className="title">Tetr.io Rankings</h1>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
