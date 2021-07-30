import React, { Suspense } from 'react';
import 'antd/dist/antd.css';

import Users from './Admin/Pages/Users/Users';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Layout } from 'antd'; 
import "lightgallery.js/dist/css/lightgallery.css";
import Blogs from './Admin/Pages/Blogs/Blogs';  
import { useSelector } from 'react-redux';

const Login = React.lazy(()=> import('./Admin/Components/Login/Login'));  
const HomePage = React.lazy(()=> import('./Admin/Pages/HomePage/HomePage'));  
const Settings = React.lazy(()=> import('./Admin/Pages/Settings/Setting'));
const Products = React.lazy(()=> import('./Admin/Pages/Products/Products'));
const GiftCode = React.lazy(()=> import('./Admin/Pages/GiftCode/GiftCode')); 
const Header = React.lazy(()=> import('./Admin/Components/Header/Header'));
const Nav = React.lazy(()=> import('./Admin/Components/Navication/Nav'));


function App() {
  
  const { Content, Footer } = Layout 
  const loginState = useSelector(store => store.login.value.success)  
  return (  
    <>
      {!loginState ? <Login/> 
      : 
        <Router> 
          <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Nav/> 
            <Layout>
              <Header/>
              <Content style={{minHeight:'100vh'}}>
                <Switch>
                  <Route exact path="/">
                    <HomePage/>
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
                  </Route>/
                  <Route path="/blogs">
                    <Blogs />
                  </Route>
                </Switch>
              </Content> 
              <Footer/>
            </Layout>
          </Layout>
          </Suspense>  
      </Router>  
      } 
    </>
  );
}

export default App;
