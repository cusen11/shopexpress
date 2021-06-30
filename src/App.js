import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Login from './Admin/Components/Login/Login';  
import HomePage from './Admin/Pages/HomePage/HomePage';
import Contact from './Admin/Pages/Contact/Contact';
import Nav from './Admin/Components/Navication/Nav';
import Settings from './Admin/Pages/Settings/Setting';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [login, setLogin] = useState(true)
  return (
    <>
      {!login ? <Login/> 
      : 
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>  
          <Route path="/settings">
            <Settings />
          </Route>  
        </Switch>
    </Router> 
      
      }
      
    </>
  );
}

export default App;
