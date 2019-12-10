import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className="link-logout" aria-live="polite">
        <span className="div-span">{this.context.user.username}</span>
        <Link to="/settings">
          <FontAwesomeIcon icon={faCog} id="settingsIcon" />
        </Link>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to="/login"
            className="logout-nav"
          >
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="links" aria-live="polite">
        <nav>
          <Link to="/login" className="login-nav">
            Login
          </Link>{' '}
          <Link to="/register" className="signup-nav">
            Sign up
          </Link>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <header>
        <div className="flexBody">
          <h1 className="app-h1">
            <Link to="/dashboard">groop</Link>
          </h1>
          <div className="loginLinks" aria-live="polite">
          {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
