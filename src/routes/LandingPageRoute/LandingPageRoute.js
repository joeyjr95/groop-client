import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPageRoute.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

export default class LandingPageRoute extends Component {
  render() {
    return (
      <>
        <div className="landing-page">
          <h2>groop</h2>
          <h3>Keep your groop in the loop.</h3>
          <Link to="/register" className="landing-signup-a">
            Sign up
          </Link>
          <a href="#about" className="landing-to-about">
            <FontAwesomeIcon icon={faAngleDoubleDown} id="icon" />
          </a>
        </div>
        <div className="landing-page-bg"></div>
      </>
    );
  }
}
