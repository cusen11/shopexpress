import { Link } from "react-router-dom";
import React, { useState } from 'react'; 
import { Typography } from "antd";
import { Layout, Menu, Avatar,Col, Row } from 'antd';
import { 
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  DingtalkOutlined,
} from '@ant-design/icons'; 


function Nav() { 

    const { Sider } = Layout;
    const { SubMenu } = Menu; 
    const { Title, Text } = Typography
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = () => { 
        setCollapsed(!collapsed)
    };
      return ( 
        <>   
        
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}> 
            <Row 
            justify='center'
            align="middle"
            style={{height:"60px"}}>
                <Col align="middle"> 
                    <Title type='success' level={4} > 
                        <Avatar size='default'>S</Avatar> 
                        <Text type='success' hidden={collapsed}> Củ Sen
                    </Text>    
                    </Title>
                    <Text type='success' hidden={collapsed}>
                    Thông tin 
                    |
                    Thông tin  
                    </Text>  
                </Col>
            </Row>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                 <Link to='/'>Dashboard</Link>
                </Menu.Item> 
                <Menu.Item key="3" icon={<DingtalkOutlined />}>
                  <Link to='/products'>Products</Link>
                </Menu.Item>
               
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu> 
                <Menu.Item key="4" icon={<SettingOutlined />}>
                  <Link to='/gift'>GiftCode</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<SettingOutlined />}>
                  <Link to='/settings'>Setting</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<UserOutlined />}>
                  <Link to='/users'>User</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        </> 
    );
}

export default Nav;