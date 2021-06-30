import React from 'react';
import { Typography } from 'antd' 

function Settings(props) {
    const {Title} = Typography
    return (
        <> 
            <Title type="success" level={2}>Settings</Title>
        </>
    );
}

export default Settings;