import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPageRoute.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import RegisterImage from '../../images/register.png'
import DashboardImage from '../../images/dashboard.png'
import GroupDashboardImage from '../../images/groupdashboard.png'
import GroupSettingsImage from '../../images/groupsettings.png'
import SettingsImage from '../../images/accountsettings.png'



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
          <div className="SectionAboutCont">
            <h2>Who we are</h2>
            <ul>
              <li>Quasar Wei</li>
              <li>Brock Boutwell</li>
              <li>Joey Romo</li>
              <li>Laura Elias</li>
              <li>Steven Rodriquez</li>
            </ul>
            <p className="Aboutdescription">
              This was a collaborative project between 5 aspiring developers.
              Our intention was to create an app that can be used for a wide
              variety of task planning and event organization all while being
              fun at the same time! Once logged in and registered a user can
              create groops. and within those groops invite/remove members,
              create/edit tasks, view scoreboard to effectively get tasks done on
              time.
            </p>
            <h3> How to use groop</h3>
          </div>
          <div className="SectionAboutCont">
            <h2>Register and Login</h2>
            <div className="MarryContainer">
              <img alt="Register/Login" src={RegisterImage} />
              <div className="TutInnerCont">
                <p>Choose a Name</p>
                <p>Choose a UserName</p>
                <p>Choose your Email Address</p>
                <p>Choose a Password</p>
                <p>Verify the Password</p>
                <p>Verify and check your email upon registering</p>
                <p>Login with a newly registered account</p>
              </div>
            </div>
          </div>
          <div className="SectionAboutCont">
            <h2>Dashboard</h2>
            <div className="MarryContainer">
              <img alt="create groops" src={DashboardImage} />
              <div className="TutInnerCont">
                <p>Search/Filter tasks</p>
                <p>Edit/See more info of Tasks Assigned to you</p>

                <h3>Sidebar Menu</h3>
                <p>Logout</p>
                <p>Settings</p>
                <p>Close the menu</p>
                <p>Create groops</p>
                <p>View/Go to groops page</p>
                <p>View Calendar</p>
              </div>
            </div>
          </div>
          <div className="SectionAboutCont">
            <h2>Groops Dashboard</h2>
            <div className="MarryContainer">
              <img alt="create groops" src={GroupDashboardImage} />
              <div className="TutInnerCont">
                <p>Search/Filter tasks</p>
                <p>View Members of a group</p>
                <p>Edit/See more info of Tasks in your groop</p>

                <h3>Sidebar Menu</h3>
                <p>Logout</p>
                <p>Settings</p>
                <p>Groop Settings</p>
                <p>Close the Menu</p>
                <p>Create Tasks</p>
                <p>View Groop Calendar</p>
              </div>
            </div>
          </div>
          <div className="SectionAboutCont">
            <h2>Settings</h2>
            <div className="MarryContainer">
              <img alt="create groops" src={SettingsImage} />
              <div className="TutInnerCont">
                <p>Edit/Change Email Address</p>
                <p>Edit/Change Password</p>
                <p>Manage Email Notifications</p>
                <p>Edit/Change email address</p>
              </div>
            </div>
          </div>
          <div className="SectionAboutCont">
            <h2>Group Settings</h2>
            <div className="MarryContainer">
              <img alt="create groops" src={GroupSettingsImage} />
              <div className="TutInnerCont">
                <p>Create Categories for Tasks</p>
                <p>Add/Remove Members from groop</p>
                <p>Delete groop entirely</p>
              </div>
            </div>
          </div>
        </section>
        <div className="landing-page-bg"></div>
      </>
    );
  }
}
