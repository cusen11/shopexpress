import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card,Typography  } from 'antd'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './LoginSlice'

function Login() {  
    const dispatch = useDispatch()
    const [ hidden , setHidden ] = useState(true) 
    const [load, setLoad] = useState(0)
    const onFinish = (values) => {  
        axios(
            {
                method:'post',
                url:'https://sendeptraidb.herokuapp.com/api/login',
                headers:{
                    'Content-Type': 'application/json',
                },
                data:values
            })
          .then(res => {
            dispatch(login(res.data)) 
          })
          .catch(function (error) {
            setHidden(false) 
            setLoad(0) 
          });
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
                    <Form name="basic" align='center' labelCol={{ span: 8}}
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
                        <Typography.Text  
                        hidden = { hidden }
                        italic={true} 
                        type='warning' 
                        style={{textAlign:'right', display: 'block'}}
                        > Sai tên đăng nhập hoặc mật khẩu </Typography.Text>
                        <br/>
                        <Form.Item wrapperCol={{ offset: 8,span: 16,}} >
                            <Button loading={load} onClick={()=> setLoad(200)} type="primary" htmlType="submit">
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

 