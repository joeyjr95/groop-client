import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GroopProvider } from './contexts/GroopContext';
import { UserProvider } from './contexts/UserContext';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import './index.scss';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <GroopProvider>
        <App />
      </GroopProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
