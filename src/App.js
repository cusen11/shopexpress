import React, { Suspense } from 'react';
import 'antd/dist/antd.css';

import Users from './Admin/Pages/Users/Users';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Layout } from 'antd'; 
import "lightgallery.js/dist/css/lightgallery.css"; 
import { useSelector } from 'react-redux';
import Login from './Admin/Components/Login/Login';
import Nav from './Admin/Components/Navication/Nav';
import Header from './Admin/Components/Header/Header';
import EditProduct from './Admin/Pages/Products/EditProduct';

const HomePage = React.lazy(()=> import('./Admin/Pages/HomePage/HomePage'));  
const Settings = React.lazy(()=> import('./Admin/Pages/Settings/Setting'));
const Products = React.lazy(()=> import('./Admin/Pages/Products/Products'));
const GiftCode = React.lazy(()=> import('./Admin/Pages/GiftCode/GiftCode')); 
const Blogs = React.lazy(()=> import('./Admin/Pages/Blogs/Blogs')); 
const CreateProduct = React.lazy(()=> import('./Admin/Pages/Products/Create'));


function App() {
  
  const { Content, Footer } = Layout 
  const loginState = useSelector(store => store.login.value.success)  
  return (  
    <>
      
      {!loginState ? <Login/> 
      : 
      
        <Router> 
          
          <Layout>
            <Nav/> 
            <Layout>
              <Header/>
              <Content style={{minHeight:'100vh'}}>
                <Switch>
                  <Suspense fallback={<div>Loading...</div>}>
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
                  </Route>
                  <Route path="/blogs">
                    <Blogs />
                  </Route>
                  <Route path="/create-product">
                    <CreateProduct />
                  </Route>
                  <Route path="/edit-product">
                    <EditProduct />
                  </Route>
                  </Suspense>  
                </Switch> 
              </Content> 
              <Footer/>
            </Layout>
          </Layout>
         
      </Router>  
     
      } 
     
    </>
  );
}

export default App;
