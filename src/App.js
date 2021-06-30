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
 


import { Layout } from 'antd';  

function App() {
  const [login, setLogin] = useState(true) 
  return (
    <>
      {!login ? <Login/> 
      : 
        <Router>
          <Layout style={{ minHeight: '100vh' }}> 
            
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
      </Layout>  
      </Router>  
      }
      
    </>
  );
}

export default App;
