import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import { history } from './app/helpers/history'
import { LoginPage } from './app/components/public-area/authentication/login/LoginPage';
import { RegisterPage } from './app/components/public-area/authentication/register/RegisterPage';
import { UserAreaPage } from './app/components/user-area/UserAreaPage';
import { loadSession } from './app/store/session';

function App() {

  const dispatch = useDispatch();

  dispatch(loadSession());

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/user" component={UserAreaPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
