import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-secondary">
        <a className="navbar-brand text-white" href="/">
          ShortUrl
        </a>
      </nav>
    );
  }
}

export default Header;
