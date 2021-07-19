import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Login from './Admin/Components/Login/Login';  
import HomePage from './Admin/Pages/HomePage/HomePage'; 
import Nav from './Admin/Components/Navication/Nav';
import Settings from './Admin/Pages/Settings/Setting';
import Products from './Admin/Pages/Products/Products';
import GiftCode from './Admin/Pages/GiftCode/GiftCode'; 
import Header from './Admin/Components/Header/Header';
import Users from './Admin/Pages/Users/Users';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Layout,Button } from 'antd'; 
import "lightgallery.js/dist/css/lightgallery.css";
import Blogs from './Admin/Pages/Blogs/Blogs'; 
import { store } from './app/store'
import { Provider } from 'react-redux'
const { Content, Footer } = Layout

function App() {
  const [login, setLogin] = useState(false) 
  
  return (
    <Provider store={store}>
      {!login ? <Login/> 
      : 
        <Router>   
          <Layout>
            <Nav/>
            <Button hidden onClick={()=> setLogin(false)} >Logout</Button> 
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
          
      </Router>  
      }
    </Provider>
  );
}

export default App;
