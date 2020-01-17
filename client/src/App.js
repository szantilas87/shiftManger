import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ShiftView from './components/pages/ShiftsView';
import Account from './components/account/Account';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import OrganizationState from './context/organization/OrganizationState';
import ShiftState from './context/shift/ShiftState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthUserToken from './utils/setAuthUserToken';
import setAuthOrgToken from './utils/setAuthOrgToken';

import './App.css';

if (localStorage.userToken) {
  setAuthUserToken(localStorage.userToken);
}

if (localStorage.organizationToken) {
  setAuthOrgToken(localStorage.organizationToken);
}
const App = () => {
  return (
    <AuthState>
      <OrganizationState>
        <ShiftState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />{' '}
                    <Route exact path='/about' component={About} />{' '}
                    <PrivateRoute exact path='/shifts' component={ShiftView} />{' '}
                    <PrivateRoute exact path='/account' component={Account} />{' '}
                    <Route exact path='/register' component={Register} />{' '}
                    <Route exact path='/login' component={Login} />{' '}
                  </Switch>{' '}
                </div>{' '}
              </Fragment>{' '}
            </Router>{' '}
          </AlertState>{' '}
        </ShiftState>{' '}
      </OrganizationState>{' '}
    </AuthState>
  );
};

export default App;
