
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Drawer, Button } from 'antd'
import { MenuOutlined  } from '@ant-design/icons'

function Nav(props) {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
      return ( 
        <> 
        <Button type="primary" onClick={showDrawer}>
          <MenuOutlined  />
        </Button>
          <Drawer
            title="Dashboard"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Link onClick={() => setVisible(false)} to="/">Home</Link>
            <Link onClick={() => setVisible(false)} to="/contact">Contact</Link>
            <Link onClick={() => setVisible(false)} to="/settings">Settings</Link> 
          </Drawer> 
        </> 
    );
}

export default Nav;