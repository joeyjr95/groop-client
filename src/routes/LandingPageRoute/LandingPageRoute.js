import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPageRoute.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

export default class LandingPageRoute extends Component {
  render() {
    return (
      <>
        <section className="landing-page">
          <div className="landing-page-headings">
            <h2>groop</h2>
            <h3>Keep your groop in the loop.</h3>
          </div>
          <Link to="/register" className="landing-signup-a">
            Sign up
          </Link>
          <a href="#about" className="landing-to-about">
            <FontAwesomeIcon icon={faAngleDoubleDown} id="icon" />
          </a>
        </section>
        <div className="landing-page-bg"></div>
      </>
    );
  }
}
