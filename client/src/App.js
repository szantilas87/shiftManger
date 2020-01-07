import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ShiftView from './components/pages/ShiftsView';

import OrganizationState from './context/organization/OrganizationState';
import ShiftState from './context/shift/ShiftState';
import './App.css';

const App = () => {
  return (
    <OrganizationState>
      <ShiftState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/shifts' component={ShiftView} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ShiftState>
    </OrganizationState>
  );
};

export default App;
