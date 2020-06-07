import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';

import './App.css';
import { LoginPage } from './app/components/public-area/authentication/login/LoginPage';
import { RegisterPage } from './app/components/public-area/authentication/register/RegisterPage';
import { history } from './app/helpers/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
