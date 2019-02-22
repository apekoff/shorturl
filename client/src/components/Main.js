import React, { Component } from "react";
import UrlForm from "./UrlForm";

class Main extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <h1>Let's short url</h1>
        <UrlForm />
      </div>
    );
  }
}

export default Main;
