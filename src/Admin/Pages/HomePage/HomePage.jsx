import React from 'react';
import { Typography } from 'antd'

function HomePage(props) {
    const {Title} = Typography
    return (
        <>
            <Title type="success" level={2}>Home Page</Title>
        </>
    );
}

export default HomePage;