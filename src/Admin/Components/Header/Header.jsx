import React from 'react';
import { Layout,Avatar,Col, Row, Button } from 'antd'
import { logout } from '../Login/LoginSlice'
import { useDispatch } from 'react-redux';

function Header() {
    const dispatch = useDispatch()
    const { Header } = Layout  
    return (
        <Header>
            <Row gutter={10}
                justify='end'
                align="middle"
                style={{height:"60px"}}>
                <Col align="middle">  
                    <Avatar size='default'>S</Avatar>    
                </Col>
                <Col align="middle">      
                    <Button size='small' onClick={()=>dispatch(logout())}>Logout</Button>
                </Col>
               
            </Row>
        </Header>
    );
}

export default Header;