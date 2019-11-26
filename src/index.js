import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import { UserProvider } from "./contexts/UserContext";
import * as serviceWorker from './serviceWorker';

import 'normalize.css'
import './index.scss';

ReactDOM.render(<BrowserRouter>
    <UserProvider>
     
        <App />

    </UserProvider>
  </BrowserRouter>, document.getElementById('root'));


serviceWorker.unregister();
