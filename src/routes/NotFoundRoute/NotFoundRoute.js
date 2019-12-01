import React, { Component } from "react";
import './NotFoundRoute.scss'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="NotFoundContainer">
        <h2>OOPS! looks like you got lost.</h2>
        <p>Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute;
