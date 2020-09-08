import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import {createBrowserHistory} from 'history'
import accountController from './server/controller';

// Stylings........
import './assets/css/bootstrap.min.css'
import './assets/fontawesome/css/font-awesome.min.css'
import "./assets/scss/style.scss"

import App from './App'

const history = createBrowserHistory()

accountController.refreshToken().finally(startApp); 

function startApp() { 
  ReactDOM.render(
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>,
    
    document.getElementById('root')
  );
}


