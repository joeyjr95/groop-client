import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import GroopSettings from '../../components/GroopSettings/GroopSettings'
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import GroopsHubRoute from '../../routes/GroopsHubRoute/GroopsHubRoute';
import GroupForm from '../../components/GroupForm/GroupForm';
import TaskFormComponent from '../../components/TaskForm/TaskForm';
import EditTask from '../../components/EditTask/EditTask';
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashBoardRoute from '../../routes/DashboardRoute/DashboardRoute';
import GroupPageRoute from '../../routes/GroupPageRoute/GroupPageRoute';
import SettingsRoute from '../../routes/SettingsRoute/SettingsRoute';

import './App.scss';

export default class App extends Component {
  state = {
    hasError: false,
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
            <PublicOnlyRoute exact path={'/'} component={LandingPageRoute} />
            <PublicOnlyRoute path={'/register'} component={RegistrationRoute} />
            <PublicOnlyRoute path={'/login'} component={LoginRoute} />
            <PrivateRoute path={'/dashboard'} component={DashBoardRoute} />
            <PrivateRoute
              exact
              path={'/group/:group_id'}
              component={GroupPageRoute}
            />
            <PrivateRoute 
            exact
            path={"/groupsettings/:group_id"}
             component={GroopSettings}
             />
            <PrivateRoute path={'/add-task'} component={TaskFormComponent} />
            <PrivateRoute path={'/edit-task'} component={EditTask} />
            <PrivateRoute path={'/add-group'} component={GroupForm} />
            <PrivateRoute path={'/settings'} component={SettingsRoute} />
            <PrivateRoute exact path={'/hub'} component={GroopsHubRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
