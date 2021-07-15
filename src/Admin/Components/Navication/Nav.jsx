import { Link } from "react-router-dom";
import React, { useState } from 'react';  
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined,
  SettingOutlined, 
  UserOutlined,
  DingtalkOutlined,
  EditOutlined
} from '@ant-design/icons'; 


function Nav() { 

    const { Sider } = Layout; 
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = () => { 
        setCollapsed(!collapsed)
    };
      return ( 
        <>   
        
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}> 
            
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                 <Link to='/'>Dashboard</Link>
                </Menu.Item> 
                <Menu.Item key="3" icon={<DingtalkOutlined />}>
                  <Link to='/products'>Products</Link>
                </Menu.Item>  
                <Menu.Item key="4" icon={<SettingOutlined />}>
                  <Link to='/gift'>GiftCode</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<EditOutlined />}>
                  <Link to='/blogs'>Blog</Link>
                </Menu.Item>
                
                <Menu.Item key="7" icon={<UserOutlined />}>
                  <Link to='/users'>User</Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<SettingOutlined />}>
                  <Link to='/settings'>Setting</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        </> 
    );
}

export default Nav;