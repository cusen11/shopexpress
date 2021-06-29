import React from 'react';
import { Form, Input, Button, Row, Col, Card,Typography  } from 'antd'; 

function Login() { 
    const onFinish = (values) => { 
        console.log('Success:', values);
        window.location.href = "/homepage";
    };
    const { Title } = Typography;
    const style={
        height: "100vh"
    }
    return (
        <Row justify="center" align="middle" style={style}>
            <Col x2={12} md={8} > 
                <Card >
                    <Title type="primary" level={2} align="center">Login</Title><br/>
                    <Form name="basic" labelCol={{ span: 8}}
                        wrapperCol={{ span: 16}}
                        initialValues={{ remember: true}}
                        onFinish={onFinish} 
                        >
                        <Form.Item label="Username" name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password"
                            rules={[{ required: true, message: 'Please input your password!'},]}
                        >
                            <Input.Password />
                        </Form.Item> 
                        <Form.Item wrapperCol={{ offset: 8,span: 16,}} >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card> 
            </Col> 
        </Row>
    );
}

export default Login;

 