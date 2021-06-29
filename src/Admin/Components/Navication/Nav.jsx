import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import HomePage from '../../Pages/HomePage/HomePage';
import Contact from '../../Pages/Contact/Contact';

function Nav(props) {
    return (
    <Router>
        <div>
          <ul>
            <li>
              <Link to="/homepage">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            
          </ul> 
          <Switch>
            <Route path="/homepage">
              <HomePage />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route> 
          </Switch>
        </div>
      </Router>
    );
}

export default Nav;