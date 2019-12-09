import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id ? (
              <Component
                {...componentProps}
                user={userContext.user}
                logout={userContext.processLogout}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        </UserContext.Consumer>
      )}
    />
  );
}
