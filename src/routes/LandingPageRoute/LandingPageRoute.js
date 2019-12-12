import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPageRoute.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import DashboardImage from '../../images/dashboard.png';
import GroupDashboardImage from '../../images/groupdashboard.png';
import GroupSettingsImage from '../../images/groupsettings.png';
import taskitemimg from '../../images/taskitem.jpg';
import searchfilterimg from '../../images/searchfilter.jpg';
import sidebarimg from '../../images/sidebar.jpg';
import weeklyglance from '../../images/weeklyglance.jpg';

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
          <a href="#About" className="landing-to-about">
            <FontAwesomeIcon icon={faAngleDoubleDown} id="icon" />
          </a>
        </section>
        <section id="About"></section>
        <section className="AboutContainer">
          <div className=" feature-section--about">
            <p className="Aboutdescription">
              Groop is an an app that can be used for a variety of collaboration
              and event organization purposes while being fun at the same time!
              Once logged in and registered, a user can create groups, and
              within those groups invite/remove members, create/edit tasks, and
              view a scoreboard to effectively get tasks done on time. Keep
              track of tasks with optional email notifications.
            </p>
          </div>
          <div className="feature-section">
            <img alt="create groops" src={DashboardImage} />
            <div className="feature-description">
              <h2>Dashboard</h2>
              <p>See all upcoming tasks you are assigned to in the dashboard</p>
            </div>
          </div>
          <div className="feature-section">
            <img alt="create groops" src={taskitemimg} />
            <div className="feature-description">
              <h2>Task Items</h2>
              <p>
                Check the priority and due date of a task at a glance. Quickly
                mark tasks as complete, show more information, or edit a task.
              </p>
            </div>
          </div>
          <div className="feature-section feature-section--filter">
            <img alt="create groops" src={searchfilterimg} />
            <div className="feature-description">
              <h2>Search</h2>
              <p>Search for tasks using different filters and a search query</p>
            </div>
          </div>
          <div className="feature-section">
            <img alt="create groops" src={sidebarimg} />
            <div className="feature-description">
              <h2>Sidebar</h2>
              <p>
                Group owners can access group settings on the respective group
                page. Members can add tasks to a group while on the group page.
                Navigate back to the dashboard from a group page, or to a
                different group from the dashboard. Access a calendar and log
                out.
              </p>
            </div>
          </div>
          <div className="feature-section">
            <div className="img-container">
              <img alt="create groops" src={GroupDashboardImage} />
            </div>
            <div className="feature-description">
              <h2>Groops Dashboard</h2>
              <p>Manage tasks on your group page</p>
            </div>
          </div>
          <div className="feature-section">
            <div className="img-container">
              <img alt="create groops" src={GroupSettingsImage} />
            </div>
            <div className="feature-description">
              <h2>Group Settings</h2>
              <p>Manage your group members and categories</p>
            </div>
          </div>
          <div className="feature-section">
            <div className="img-container">
              <img alt="create groops" src={weeklyglance} />
            </div>
            <div className="feature-description">
              <h2>Email Notifications</h2>
              <p>
                Stay up to date with email notifications and a weekly reminder
              </p>
            </div>
          </div>
        </section>
        <div className="landing-page-bg"></div>
        <div className=" feature-section--about">
          <ul>
            <li>Quasar Wei</li>
            <li>Brock Boutwell</li>
            <li>Joey Romo</li>
            <li>Laura Elias</li>
          </ul>
        </div>
      </>
    );
  }
}
