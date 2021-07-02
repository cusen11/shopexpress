import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Login from './Admin/Components/Login/Login';  
import HomePage from './Admin/Pages/HomePage/HomePage';
import Contact from './Admin/Pages/Contact/Contact';
import Nav from './Admin/Components/Navication/Nav';
import Settings from './Admin/Pages/Settings/Setting';
import Products from './Admin/Pages/Products/Products';
import GiftCode from './Admin/Pages/GiftCode/GiftCode'; 
import Users from './Admin/Pages/Users/Users';
import {  BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Layout } from 'antd'; 
import "lightgallery.js/dist/css/lightgallery.css";


const { Footer } = Layout

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
            <Route path="/products">
              <Products />
            </Route> 
            <Route path="/gift">
              <GiftCode />
            </Route> 
            <Route path="/users">
              <Users />
            </Route>
          </Switch>  
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>  
      </Router>  
      }
      
    </>
  );
}

export default App;
