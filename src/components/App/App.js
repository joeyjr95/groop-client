import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import LandingPageRoute from "../../routes/LandingPageRoute/LandingPageRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import RegistrationRoute from "../../routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import './App.scss';
import DashBoardRoute from "../../routes/DashboardRoute/DashboardRoute";
import GroupPageRoute from "../../routes/GroupPageRoute/GroupPageRoute";
import TaskFormComponent from "../../components/TaskForm/TaskForm";


export default class App extends Component {
  state = { 
    hasError: false 
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingPageRoute}
            />
            <PublicOnlyRoute 
              path={"/register"} 
              component={RegistrationRoute} 
            />
            <PublicOnlyRoute 
              path={"/login"} 
              component={LoginRoute} 
            />
            <PrivateRoute 
            path={"/dashboard"}
             component={DashBoardRoute}
             />
             <PrivateRoute 
            path={"/group"}
             component={GroupPageRoute}
             />
             <PrivateRoute 
            path={"/add-task"}
             component={TaskFormComponent}
             />
            <Route 
              component={NotFoundRoute} 
            />
          </Switch>
          <Footer />
        </main>
      </div>
    );
  }
}
